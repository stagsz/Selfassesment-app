import { Router } from 'express';
import { assessmentController } from '../controllers/assessmentController';
import { withAuth, withAuthAndRoles, withValidation, asyncHandler } from '../proxy';
import { assessmentSchemas, commonSchemas } from '../proxy/validationProxy';

const router = Router();

// All routes require authentication
router.use(withAuth((req, res, next) => next()));

// List assessments
router.get(
  '/',
  withValidation(
    { query: commonSchemas.pagination.merge(commonSchemas.search) },
    asyncHandler(assessmentController.list.bind(assessmentController))
  )
);

// Create assessment
router.post(
  '/',
  withAuthAndRoles(
    ['SYSTEM_ADMIN', 'QUALITY_MANAGER', 'INTERNAL_AUDITOR'],
    withValidation(
      { body: assessmentSchemas.create },
      asyncHandler(assessmentController.create.bind(assessmentController))
    )
  )
);

// Get assessment by ID
router.get(
  '/:id',
  withValidation(
    { params: commonSchemas.uuidParam },
    asyncHandler(assessmentController.getById.bind(assessmentController))
  )
);

// Update assessment
router.put(
  '/:id',
  withValidation(
    { params: commonSchemas.uuidParam, body: assessmentSchemas.update },
    asyncHandler(assessmentController.update.bind(assessmentController))
  )
);

// Delete assessment
router.delete(
  '/:id',
  withAuthAndRoles(
    ['SYSTEM_ADMIN', 'QUALITY_MANAGER'],
    withValidation(
      { params: commonSchemas.uuidParam },
      asyncHandler(assessmentController.delete.bind(assessmentController))
    )
  )
);

// Calculate scores
router.post(
  '/:id/calculate-scores',
  withValidation(
    { params: commonSchemas.uuidParam },
    asyncHandler(assessmentController.calculateScores.bind(assessmentController))
  )
);

// Clone assessment
router.post(
  '/:id/clone',
  withAuthAndRoles(
    ['SYSTEM_ADMIN', 'QUALITY_MANAGER', 'INTERNAL_AUDITOR'],
    withValidation(
      { params: commonSchemas.uuidParam },
      asyncHandler(assessmentController.clone.bind(assessmentController))
    )
  )
);

export default router;
