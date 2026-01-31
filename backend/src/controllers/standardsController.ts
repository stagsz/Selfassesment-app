import { Request, Response } from 'express';
import { z } from 'zod';
import { standardsService } from '../services/standardsService';
import { withValidation, commonSchemas } from '../proxy/validationProxy';

// -----------------------------------------------------------------------------
// Validation Schemas
// -----------------------------------------------------------------------------

export const standardsSchemas = {
  // Query params for questions list
  questionsQuery: z.object({
    sectionId: z.string().uuid('Invalid section ID format').optional(),
    isActive: z.coerce.boolean().optional(),
    q: z.string().min(1).max(100).optional(),
  }),

  // Create question body
  createQuestion: z.object({
    questionNumber: z.string().min(1, 'Question number is required').max(50),
    questionText: z.string().min(1, 'Question text is required').max(2000),
    sectionId: z.string().uuid('Invalid section ID format'),
    guidance: z.string().max(5000).optional(),
    score1Criteria: z.string().max(2000).optional(),
    score2Criteria: z.string().max(2000).optional(),
    score3Criteria: z.string().max(2000).optional(),
    standardReference: z.string().max(255).optional(),
    isActive: z.boolean().default(true),
    order: z.number().int().min(0).default(0),
  }),

  // Update question body
  updateQuestion: z.object({
    questionText: z.string().min(1).max(2000).optional(),
    sectionId: z.string().uuid('Invalid section ID format').optional(),
    guidance: z.string().max(5000).optional(),
    score1Criteria: z.string().max(2000).optional(),
    score2Criteria: z.string().max(2000).optional(),
    score3Criteria: z.string().max(2000).optional(),
    standardReference: z.string().max(255).optional(),
    isActive: z.boolean().optional(),
    order: z.number().int().min(0).optional(),
  }),
};

// -----------------------------------------------------------------------------
// Controller
// -----------------------------------------------------------------------------

export class StandardsController {
  /**
   * GET /api/standards/sections
   * Returns all sections as a hierarchical tree structure
   */
  getSections = withValidation(
    {},
    async (_req: Request, res: Response): Promise<void> => {
      const sections = await standardsService.getSections();

      res.json({
        success: true,
        data: sections,
      });
    }
  );

  /**
   * GET /api/standards/sections/:id
   * Returns a single section with its children and questions
   */
  getSectionById = withValidation(
    { params: commonSchemas.uuidParam },
    async (req: Request, res: Response): Promise<void> => {
      const section = await standardsService.getSectionById(req.params.id);

      res.json({
        success: true,
        data: section,
      });
    }
  );

  /**
   * GET /api/standards/questions
   * Returns questions with optional filtering
   */
  getQuestions = withValidation(
    { query: standardsSchemas.questionsQuery },
    async (req: Request, res: Response): Promise<void> => {
      const { sectionId, isActive, q } = req.query as {
        sectionId?: string;
        isActive?: boolean;
        q?: string;
      };

      const questions = await standardsService.getQuestions({
        sectionId,
        isActive,
        searchTerm: q,
      });

      res.json({
        success: true,
        data: questions,
        count: questions.length,
      });
    }
  );

  /**
   * GET /api/standards/questions/:id
   * Returns a single question by ID
   */
  getQuestionById = withValidation(
    { params: commonSchemas.uuidParam },
    async (req: Request, res: Response): Promise<void> => {
      const question = await standardsService.getQuestionById(req.params.id);

      res.json({
        success: true,
        data: question,
      });
    }
  );

  /**
   * POST /api/standards/questions
   * Creates a new audit question
   */
  createQuestion = withValidation(
    { body: standardsSchemas.createQuestion },
    async (req: Request, res: Response): Promise<void> => {
      const question = await standardsService.createQuestion(req.body);

      res.status(201).json({
        success: true,
        data: question,
      });
    }
  );

  /**
   * PUT /api/standards/questions/:id
   * Updates an existing audit question
   */
  updateQuestion = withValidation(
    {
      params: commonSchemas.uuidParam,
      body: standardsSchemas.updateQuestion,
    },
    async (req: Request, res: Response): Promise<void> => {
      const question = await standardsService.updateQuestion(
        req.params.id,
        req.body
      );

      res.json({
        success: true,
        data: question,
      });
    }
  );
}

export const standardsController = new StandardsController();
