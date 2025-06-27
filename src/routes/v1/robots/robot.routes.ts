import express, { Router } from 'express';

import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';

import {
  createRobotController,
  deleteRobotController,
  getAllRobotsController,
  getRobotByIdController,
  updateRobotController,
} from '@/controllers/robots/robots.controller.js';
import { uuidParamValidator } from '@/validators/general.validators.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/', getAllRobotsController);
router.get(
  '/:id',
  uuidParamValidator,
  validationMiddleware,
  getRobotByIdController,
);
router.post('/', createRobotController);

router.put(
  '/:id',
  uuidParamValidator,
  validationMiddleware,
  updateRobotController,
);
router.delete(
  '/:id',
  uuidParamValidator,
  validationMiddleware,
  deleteRobotController,
);

export default router;
