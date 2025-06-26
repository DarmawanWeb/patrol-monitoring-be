import { Router } from 'express';
const router: Router = Router();

import robotTypesRoutes from './robot-type.routes.js';
import robotRoutes from './robot.routes.js';

router.use('/types', robotTypesRoutes);
router.use('/', robotRoutes);

export default router;
