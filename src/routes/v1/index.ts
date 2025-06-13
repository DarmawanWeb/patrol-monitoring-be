import { Router } from 'express';
const router: Router = Router();

import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import patrolArea from './patrol-area.routes.js';

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/patrol-areas', patrolArea);

export default router;
