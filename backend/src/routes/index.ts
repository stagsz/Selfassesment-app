import { Router } from 'express';
import authRoutes from './authRoutes';
import assessmentRoutes from './assessmentRoutes';

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

export default router;
