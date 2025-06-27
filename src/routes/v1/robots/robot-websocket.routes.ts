import express, { Router } from 'express';

import { authMiddleware } from '@/middleware/auth.middleware.js';
import { uuidParamValidator } from '@/validators/general.validators.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import { robotWebsocketQueryValidators } from '@/validators/robots/robot-websocket.validator.js';

import {
  getAllRobotRoutesController,
  getRobotRouteByIdController,
} from '@/controllers/robots/robot-websockets.controller.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.get(
  '/',
  robotWebsocketQueryValidators,
  validationMiddleware,
  getAllRobotRoutesController,
);

router.get(
  '/:id',
  uuidParamValidator,
  robotWebsocketQueryValidators,
  validationMiddleware,
  getRobotRouteByIdController,
);

export default router;
