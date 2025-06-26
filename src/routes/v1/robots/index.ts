import { Router } from 'express';
const router: Router = Router();

import robotTypesRoutes from './robot-type.routes.js';

router.use('/types', robotTypesRoutes);

export default router;
