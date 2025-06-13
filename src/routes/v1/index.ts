import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import patrolArea from './patrol-area.routes.js';
const router: Router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/patrol-areas', patrolArea);

export default router;
