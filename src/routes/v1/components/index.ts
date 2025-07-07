import { Router } from 'express';

const router: Router = Router();

import componentTypeRoutes from './components-type.routes.js';

router.use('/types', componentTypeRoutes);

export default router;
