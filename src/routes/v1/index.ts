import { Router } from 'express';

const router: Router = Router();

import authRoutes from './auth.routes.js';
import componentRoutes from './components/index.js';
import healthRoutes from './health.routes.js';
import patrolsRoutes from './patrols/index.js';
import robotRoutes from './robots/index.js';
import userRoutes from './user.routes.js';

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/robots', robotRoutes);
router.use('/users', userRoutes);
router.use('/components', componentRoutes);
router.use('/patrols', patrolsRoutes);

export default router;
