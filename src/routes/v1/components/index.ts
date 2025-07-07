import { Router } from 'express';

const router: Router = Router();

import componentRoutes from './component.routes.js';
import componentTypeRoutes from './components-type.routes.js';

router.use('/types', componentTypeRoutes);
router.use('/components', componentRoutes);

export default router;
