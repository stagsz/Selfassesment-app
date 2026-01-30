import { prisma } from '../config/database';
import { NotFoundError, ValidationError, AuthorizationError } from '../utils/errors';
import { AssessmentStatus, AuditType, UserRole } from '@prisma/client';

interface CreateAssessmentData {
  title: string;
  description?: string;
  auditType?: AuditType;
  scope?: string;
  objectives?: string[];
  scheduledDate?: Date;
  dueDate?: Date;
  templateId?: string;
  teamMemberIds?: string[];
}

interface UpdateAssessmentData {
  title?: string;
  description?: string;
  status?: AssessmentStatus;
  auditType?: AuditType;
  scope?: string;
  objectives?: string[];
  scheduledDate?: Date;
  dueDate?: Date;
  completedDate?: Date;
}

interface AssessmentFilters {
  status?: AssessmentStatus[];
  startDate?: Date;
  endDate?: Date;
  leadAuditorId?: string;
  searchTerm?: string;
}

interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class AssessmentService {
  /**
   * Create a new assessment
   */
  async create(
    organizationId: string,
    leadAuditorId: string,
    data: CreateAssessmentData
  ) {
    // Validate template exists if provided
    if (data.templateId) {
      const template = await prisma.assessmentTemplate.findFirst({
        where: {
          id: data.templateId,
          organizationId,
        },
      });
      if (!template) {
        throw new NotFoundError('Assessment Template', data.templateId);
      }
    }

    // Validate team members exist in the organization
    if (data.teamMemberIds?.length) {
      const validMembers = await prisma.user.count({
        where: {
          id: { in: data.teamMemberIds },
          organizationId,
          isActive: true,
        },
      });
      if (validMembers !== data.teamMemberIds.length) {
        throw new ValidationError('One or more team members are invalid');
      }
    }

    const assessment = await prisma.assessment.create({
      data: {
        title: data.title,
        description: data.description,
        auditType: data.auditType || 'INTERNAL',
        scope: data.scope,
        objectives: data.objectives || [],
        scheduledDate: data.scheduledDate,
        dueDate: data.dueDate,
        organizationId,
        leadAuditorId,
        templateId: data.templateId,
        teamMembers: data.teamMemberIds?.length
          ? {
              create: data.teamMemberIds.map((userId) => ({
                userId,
              })),
            }
          : undefined,
      },
      include: {
        leadAuditor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        teamMembers: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return assessment;
  }

  /**
   * Get assessment by ID
   */
  async getById(id: string, organizationId: string) {
    const assessment = await prisma.assessment.findFirst({
      where: {
        id,
        organizationId,
      },
      include: {
        leadAuditor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        teamMembers: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        template: {
          select: {
            id: true,
            name: true,
          },
        },
        responses: {
          include: {
            question: true,
            section: true,
            evidence: true,
          },
        },
        nonConformities: {
          include: {
            correctiveActions: true,
          },
        },
      },
    });

    if (!assessment) {
      throw new NotFoundError('Assessment', id);
    }

    return assessment;
  }

  /**
   * List assessments with filtering and pagination
   */
  async list(
    organizationId: string,
    filters: AssessmentFilters,
    pagination: PaginationParams
  ) {
    const { page, pageSize, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const skip = (page - 1) * pageSize;

    const where: any = {
      organizationId,
    };

    if (filters.status?.length) {
      where.status = { in: filters.status };
    }

    if (filters.leadAuditorId) {
      where.leadAuditorId = filters.leadAuditorId;
    }

    if (filters.startDate || filters.endDate) {
      where.scheduledDate = {};
      if (filters.startDate) {
        where.scheduledDate.gte = filters.startDate;
      }
      if (filters.endDate) {
        where.scheduledDate.lte = filters.endDate;
      }
    }

    if (filters.searchTerm) {
      where.OR = [
        { title: { contains: filters.searchTerm, mode: 'insensitive' } },
        { description: { contains: filters.searchTerm, mode: 'insensitive' } },
      ];
    }

    const [assessments, totalItems] = await Promise.all([
      prisma.assessment.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
        include: {
          leadAuditor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          _count: {
            select: {
              responses: true,
              nonConformities: true,
            },
          },
        },
      }),
      prisma.assessment.count({ where }),
    ]);

    // Calculate progress for each assessment
    const totalQuestions = await prisma.auditQuestion.count();
    const assessmentsWithProgress = assessments.map((assessment) => ({
      ...assessment,
      progress: totalQuestions > 0
        ? Math.round((assessment._count.responses / totalQuestions) * 100)
        : 0,
    }));

    return {
      data: assessmentsWithProgress,
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
      },
    };
  }

  /**
   * Update assessment
   */
  async update(
    id: string,
    organizationId: string,
    userId: string,
    userRole: UserRole,
    data: UpdateAssessmentData
  ) {
    const assessment = await prisma.assessment.findFirst({
      where: { id, organizationId },
    });

    if (!assessment) {
      throw new NotFoundError('Assessment', id);
    }

    // Check permissions
    const canEdit =
      userRole === 'SYSTEM_ADMIN' ||
      userRole === 'QUALITY_MANAGER' ||
      assessment.leadAuditorId === userId;

    if (!canEdit) {
      throw new AuthorizationError('You do not have permission to edit this assessment');
    }

    // Validate status transitions
    if (data.status) {
      this.validateStatusTransition(assessment.status, data.status);
    }

    const updated = await prisma.assessment.update({
      where: { id },
      data: {
        ...data,
        ...(data.status === 'COMPLETED' && { completedDate: new Date() }),
      },
      include: {
        leadAuditor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        teamMembers: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return updated;
  }

  /**
   * Delete assessment (soft delete by archiving)
   */
  async delete(id: string, organizationId: string, userId: string, userRole: UserRole) {
    const assessment = await prisma.assessment.findFirst({
      where: { id, organizationId },
    });

    if (!assessment) {
      throw new NotFoundError('Assessment', id);
    }

    // Only admins and quality managers can delete
    if (userRole !== 'SYSTEM_ADMIN' && userRole !== 'QUALITY_MANAGER') {
      throw new AuthorizationError('You do not have permission to delete assessments');
    }

    // Archive instead of hard delete
    await prisma.assessment.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    });

    return { success: true };
  }

  /**
   * Calculate and update assessment scores
   */
  async calculateScores(id: string) {
    const assessment = await prisma.assessment.findUnique({
      where: { id },
      include: {
        responses: {
          where: { isDraft: false },
          include: {
            question: true,
            section: true,
          },
        },
      },
    });

    if (!assessment) {
      throw new NotFoundError('Assessment', id);
    }

    // Group responses by section
    const sectionResponses = new Map<string, typeof assessment.responses>();

    for (const response of assessment.responses) {
      const sectionId = response.sectionId;
      if (!sectionResponses.has(sectionId)) {
        sectionResponses.set(sectionId, []);
      }
      sectionResponses.get(sectionId)!.push(response);
    }

    // Calculate section scores
    const sectionScores: any[] = [];
    let totalScore = 0;
    let totalMaxScore = 0;

    for (const [sectionId, responses] of sectionResponses) {
      const section = responses[0].section;
      const validResponses = responses.filter((r) => r.score !== null);

      if (validResponses.length > 0) {
        const actualScore = validResponses.reduce((sum, r) => sum + (r.score || 0), 0);
        const maxPossibleScore = validResponses.length * 3;
        const scorePercentage = (actualScore / maxPossibleScore) * 100;

        sectionScores.push({
          sectionId,
          sectionNumber: section.sectionNumber,
          sectionTitle: section.title,
          score: Math.round(scorePercentage * 10) / 10,
          actualScore,
          maxPossibleScore,
          questionsAnswered: validResponses.length,
          totalQuestions: responses.length,
        });

        totalScore += actualScore;
        totalMaxScore += maxPossibleScore;
      }
    }

    const overallScore = totalMaxScore > 0
      ? Math.round((totalScore / totalMaxScore) * 1000) / 10
      : 0;

    // Update assessment with calculated scores
    await prisma.assessment.update({
      where: { id },
      data: {
        overallScore,
        sectionScores,
      },
    });

    return {
      overallScore,
      sectionScores,
    };
  }

  /**
   * Clone an assessment for comparison
   */
  async clone(id: string, organizationId: string, userId: string, newTitle: string) {
    const original = await prisma.assessment.findFirst({
      where: { id, organizationId },
      include: {
        teamMembers: true,
      },
    });

    if (!original) {
      throw new NotFoundError('Assessment', id);
    }

    const cloned = await prisma.assessment.create({
      data: {
        title: newTitle,
        description: original.description,
        auditType: original.auditType,
        scope: original.scope,
        objectives: original.objectives,
        organizationId,
        leadAuditorId: userId,
        templateId: original.templateId,
        previousAssessmentId: id,
        teamMembers: {
          create: original.teamMembers.map((tm) => ({
            userId: tm.userId,
            role: tm.role,
          })),
        },
      },
      include: {
        leadAuditor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return cloned;
  }

  /**
   * Validate status transitions
   */
  private validateStatusTransition(currentStatus: AssessmentStatus, newStatus: AssessmentStatus): void {
    const validTransitions: Record<AssessmentStatus, AssessmentStatus[]> = {
      DRAFT: ['IN_PROGRESS', 'ARCHIVED'],
      IN_PROGRESS: ['UNDER_REVIEW', 'DRAFT', 'ARCHIVED'],
      UNDER_REVIEW: ['COMPLETED', 'IN_PROGRESS', 'ARCHIVED'],
      COMPLETED: ['ARCHIVED'],
      ARCHIVED: ['DRAFT'],
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new ValidationError(
        `Cannot transition from ${currentStatus} to ${newStatus}`
      );
    }
  }
}

export const assessmentService = new AssessmentService();
