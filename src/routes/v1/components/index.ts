import { Router } from 'express';

const router: Router = Router();

import componentRoutes from './component.routes.js';
import componentDetailRoutes from './component-detail.routes.js';
import ComponentMaintenanceLogRoutes from './component-maintenace-log.routes.js';
import componentTypeRoutes from './components-type.routes.js';

router.use('/types', componentTypeRoutes);
router.use('/components', componentRoutes);
router.use('/details', componentDetailRoutes);
router.use('/maintenance-logs', ComponentMaintenanceLogRoutes);

export default router;
