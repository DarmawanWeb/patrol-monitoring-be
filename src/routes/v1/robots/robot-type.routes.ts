import express, { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';

import {
  createRobotTypeController,
  getAllRobotTypesController,
  getRobotTypeByIdController,
  updateRobotTypeController,
  deleteRobotTypeController,
} from '@/controllers/robots/robot-types.controller.js';

import { idParamValidator } from '@/validators/general.validators.js';
import { robotTypeValidators } from '@/validators/robots/robot-type.validator.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/', getAllRobotTypesController);
router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getRobotTypeByIdController,
);
router.post(
  '/',
  robotTypeValidators,
  validationMiddleware,
  createRobotTypeController,
);
router.put(
  '/:id',
  idParamValidator,
  robotTypeValidators,
  validationMiddleware,
  updateRobotTypeController,
);
router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deleteRobotTypeController,
);

export default router;
