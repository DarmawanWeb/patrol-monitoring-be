import { Router } from 'express';

const router: Router = Router();

import authRoutes from './auth.routes.js';
import healthRoutes from './health.routes.js';
import robotRoutes from './robots/index.js';
import userRoutes from './user.routes.js';

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/robots', robotRoutes);
router.use('/users', userRoutes);

export default router;
