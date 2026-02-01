import { prisma } from '../config/database';
import { NotFoundError } from '../utils/errors';

interface TemplateData {
  id: string;
  name: string;
  description: string | null;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
}

interface TemplateListResult {
  templates: TemplateData[];
  total: number;
}

export class TemplateService {
  /**
   * List templates for an organization
   * Returns all templates for the given organization
   */
  async list(organizationId: string): Promise<TemplateListResult> {
    const templates = await prisma.assessmentTemplate.findMany({
      where: {
        organizationId,
      },
      orderBy: [
        { isDefault: 'desc' },
        { name: 'asc' },
      ],
      select: {
        id: true,
        name: true,
        description: true,
        isDefault: true,
        createdAt: true,
        updatedAt: true,
        organizationId: true,
      },
    });

    return {
      templates,
      total: templates.length,
    };
  }

  /**
   * Get a template by ID
   */
  async getById(id: string, organizationId: string): Promise<TemplateData> {
    const template = await prisma.assessmentTemplate.findFirst({
      where: {
        id,
        organizationId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        isDefault: true,
        createdAt: true,
        updatedAt: true,
        organizationId: true,
      },
    });

    if (!template) {
      throw new NotFoundError('Assessment Template', id);
    }

    return template;
  }
}

export const templateService = new TemplateService();
