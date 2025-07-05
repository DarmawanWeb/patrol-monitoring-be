import express, { type Router } from 'express';
import {
  getAllRobotRoutesController,
  getRobotRouteByIdController,
} from '@/controllers/robots/robot-websockets.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import { uuidParamValidator } from '@/validators/general.validators.js';
import { robotWebsocketQueryValidators } from '@/validators/robots/robot-websocket.validator.js';

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
