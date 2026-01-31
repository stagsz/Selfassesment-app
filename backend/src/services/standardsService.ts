import { prisma } from '../config/database';
import { NotFoundError, ValidationError } from '../utils/errors';

interface CreateQuestionData {
  questionNumber: string;
  questionText: string;
  sectionId: string;
  guidance?: string;
  score1Criteria?: string;
  score2Criteria?: string;
  score3Criteria?: string;
  standardReference?: string;
  isActive?: boolean;
  order?: number;
}

interface UpdateQuestionData {
  questionText?: string;
  sectionId?: string;
  guidance?: string;
  score1Criteria?: string;
  score2Criteria?: string;
  score3Criteria?: string;
  standardReference?: string;
  isActive?: boolean;
  order?: number;
}

interface QuestionFilters {
  sectionId?: string;
  isActive?: boolean;
  searchTerm?: string;
}

interface SectionWithChildren {
  id: string;
  sectionNumber: string;
  title: string;
  description: string | null;
  order: number;
  parentId: string | null;
  createdAt: Date;
  children: SectionWithChildren[];
  _count?: {
    questions: number;
  };
}

export class StandardsService {
  /**
   * Get all sections as a hierarchical tree structure
   */
  async getSections(): Promise<SectionWithChildren[]> {
    const sections = await prisma.iSOStandardSection.findMany({
      orderBy: [{ order: 'asc' }, { sectionNumber: 'asc' }],
      include: {
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });

    // Build tree structure from flat list
    return this.buildSectionTree(sections);
  }

  /**
   * Get a section by ID with its children and questions
   */
  async getSectionById(id: string) {
    const section = await prisma.iSOStandardSection.findUnique({
      where: { id },
      include: {
        parent: {
          select: {
            id: true,
            sectionNumber: true,
            title: true,
          },
        },
        children: {
          orderBy: [{ order: 'asc' }, { sectionNumber: 'asc' }],
          select: {
            id: true,
            sectionNumber: true,
            title: true,
            description: true,
            order: true,
          },
        },
        questions: {
          where: { isActive: true },
          orderBy: [{ order: 'asc' }, { questionNumber: 'asc' }],
          select: {
            id: true,
            questionNumber: true,
            questionText: true,
            guidance: true,
            score1Criteria: true,
            score2Criteria: true,
            score3Criteria: true,
            standardReference: true,
            order: true,
          },
        },
        _count: {
          select: {
            questions: true,
            children: true,
          },
        },
      },
    });

    if (!section) {
      throw new NotFoundError('ISO Standard Section', id);
    }

    return section;
  }

  /**
   * Get questions with optional filtering
   */
  async getQuestions(filters: QuestionFilters = {}) {
    const where: Record<string, unknown> = {};

    if (filters.sectionId) {
      where.sectionId = filters.sectionId;
    }

    if (typeof filters.isActive === 'boolean') {
      where.isActive = filters.isActive;
    }

    if (filters.searchTerm) {
      where.OR = [
        { questionText: { contains: filters.searchTerm } },
        { questionNumber: { contains: filters.searchTerm } },
        { guidance: { contains: filters.searchTerm } },
      ];
    }

    const questions = await prisma.auditQuestion.findMany({
      where,
      orderBy: [{ order: 'asc' }, { questionNumber: 'asc' }],
      include: {
        section: {
          select: {
            id: true,
            sectionNumber: true,
            title: true,
          },
        },
      },
    });

    return questions;
  }

  /**
   * Get a single question by ID
   */
  async getQuestionById(id: string) {
    const question = await prisma.auditQuestion.findUnique({
      where: { id },
      include: {
        section: {
          select: {
            id: true,
            sectionNumber: true,
            title: true,
            description: true,
          },
        },
      },
    });

    if (!question) {
      throw new NotFoundError('Audit Question', id);
    }

    return question;
  }

  /**
   * Create a new audit question
   */
  async createQuestion(data: CreateQuestionData) {
    // Validate section exists
    const section = await prisma.iSOStandardSection.findUnique({
      where: { id: data.sectionId },
    });

    if (!section) {
      throw new NotFoundError('ISO Standard Section', data.sectionId);
    }

    // Check for duplicate question number
    const existing = await prisma.auditQuestion.findUnique({
      where: { questionNumber: data.questionNumber },
    });

    if (existing) {
      throw new ValidationError(`Question number '${data.questionNumber}' already exists`);
    }

    const question = await prisma.auditQuestion.create({
      data: {
        questionNumber: data.questionNumber,
        questionText: data.questionText,
        sectionId: data.sectionId,
        guidance: data.guidance,
        score1Criteria: data.score1Criteria,
        score2Criteria: data.score2Criteria,
        score3Criteria: data.score3Criteria,
        standardReference: data.standardReference,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
      include: {
        section: {
          select: {
            id: true,
            sectionNumber: true,
            title: true,
          },
        },
      },
    });

    return question;
  }

  /**
   * Update an existing audit question
   */
  async updateQuestion(id: string, data: UpdateQuestionData) {
    const question = await prisma.auditQuestion.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundError('Audit Question', id);
    }

    // Validate new section if changing
    if (data.sectionId && data.sectionId !== question.sectionId) {
      const section = await prisma.iSOStandardSection.findUnique({
        where: { id: data.sectionId },
      });

      if (!section) {
        throw new NotFoundError('ISO Standard Section', data.sectionId);
      }
    }

    const updated = await prisma.auditQuestion.update({
      where: { id },
      data,
      include: {
        section: {
          select: {
            id: true,
            sectionNumber: true,
            title: true,
          },
        },
      },
    });

    return updated;
  }

  /**
   * Build a tree structure from flat section list
   */
  private buildSectionTree(
    sections: Array<{
      id: string;
      sectionNumber: string;
      title: string;
      description: string | null;
      order: number;
      parentId: string | null;
      createdAt: Date;
      _count?: { questions: number };
    }>
  ): SectionWithChildren[] {
    const sectionMap = new Map<string, SectionWithChildren>();
    const rootSections: SectionWithChildren[] = [];

    // First pass: create all nodes
    for (const section of sections) {
      sectionMap.set(section.id, {
        ...section,
        children: [],
      });
    }

    // Second pass: build tree
    for (const section of sections) {
      const node = sectionMap.get(section.id)!;
      if (section.parentId) {
        const parent = sectionMap.get(section.parentId);
        if (parent) {
          parent.children.push(node);
        } else {
          // Orphaned section (parent not found), add to root
          rootSections.push(node);
        }
      } else {
        rootSections.push(node);
      }
    }

    return rootSections;
  }
}

export const standardsService = new StandardsService();
