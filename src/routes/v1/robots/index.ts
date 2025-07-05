import { Router } from 'express';

const router: Router = Router();

import robotRoutes from './robot.routes.js';
import robotTypesRoutes from './robot-type.routes.js';
import robotWebsocketRoutes from './robot-websocket.routes.js';

router.use('/types', robotTypesRoutes);
router.use('/robots', robotRoutes);
router.use('/websockets', robotWebsocketRoutes);

export default router;
