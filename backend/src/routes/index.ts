import { Router } from 'express';
import authRoutes from './authRoutes';
import assessmentRoutes from './assessmentRoutes';
import standardsRoutes from './standardsRoutes';
import { evidenceRouter, responseEvidenceRouter } from './evidenceRoutes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/assessments', assessmentRoutes);
router.use('/standards', standardsRoutes);
router.use('/evidence', evidenceRouter);
router.use('/responses/:id/evidence', responseEvidenceRouter);

export default router;
