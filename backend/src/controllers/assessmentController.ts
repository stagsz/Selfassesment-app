import { Request, Response } from 'express';
import { assessmentService } from '../services/assessmentService';

export class AssessmentController {
  /**
   * POST /api/assessments
   */
  async create(req: Request, res: Response): Promise<void> {
    const assessment = await assessmentService.create(
      req.user!.organizationId,
      req.user!.userId,
      req.body
    );

    res.status(201).json({
      success: true,
      data: assessment,
    });
  }

  /**
   * GET /api/assessments
   */
  async list(req: Request, res: Response): Promise<void> {
    const { page, pageSize, sortBy, sortOrder, status, startDate, endDate, leadAuditorId, q } = req.query;

    const result = await assessmentService.list(
      req.user!.organizationId,
      {
        status: status ? (status as string).split(',') as any : undefined,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
        leadAuditorId: leadAuditorId as string,
        searchTerm: q as string,
      },
      {
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 20,
        sortBy: sortBy as string,
        sortOrder: (sortOrder as 'asc' | 'desc') || 'desc',
      }
    );

    res.json({
      success: true,
      ...result,
    });
  }

  /**
   * GET /api/assessments/:id
   */
  async getById(req: Request, res: Response): Promise<void> {
    const assessment = await assessmentService.getById(
      req.params.id,
      req.user!.organizationId
    );

    res.json({
      success: true,
      data: assessment,
    });
  }

  /**
   * PUT /api/assessments/:id
   */
  async update(req: Request, res: Response): Promise<void> {
    const assessment = await assessmentService.update(
      req.params.id,
      req.user!.organizationId,
      req.user!.userId,
      req.user!.role,
      req.body
    );

    res.json({
      success: true,
      data: assessment,
    });
  }

  /**
   * DELETE /api/assessments/:id
   */
  async delete(req: Request, res: Response): Promise<void> {
    await assessmentService.delete(
      req.params.id,
      req.user!.organizationId,
      req.user!.userId,
      req.user!.role
    );

    res.json({
      success: true,
      message: 'Assessment archived successfully',
    });
  }

  /**
   * POST /api/assessments/:id/calculate-scores
   */
  async calculateScores(req: Request, res: Response): Promise<void> {
    const scores = await assessmentService.calculateScores(req.params.id);

    res.json({
      success: true,
      data: scores,
    });
  }

  /**
   * POST /api/assessments/:id/clone
   */
  async clone(req: Request, res: Response): Promise<void> {
    const { title } = req.body;

    const cloned = await assessmentService.clone(
      req.params.id,
      req.user!.organizationId,
      req.user!.userId,
      title
    );

    res.status(201).json({
      success: true,
      data: cloned,
    });
  }
}

export const assessmentController = new AssessmentController();
