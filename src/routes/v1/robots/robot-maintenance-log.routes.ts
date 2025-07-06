import express, { type Router } from 'express';
import {
  createMaintenanceLogsController,
  deleteMaintenanceLogController,
  getAllMaintenanceLogsController,
  getMaintenanceLogByIdController,
  getMaintenanceLogsByRobotIdController,
  updateMaintenanceLogController,
} from '@/controllers/robots/robot-maintenance-logs.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import {
  idParamValidator,
  uuidParamValidator,
} from '@/validators/general.validators.js';
import {
  createRobotMaintenanceLogValidators,
  updateRobotMaintenanceLogValidators,
} from '@/validators/robots/robot-maintenance-log.validator.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.post(
  '/',
  createRobotMaintenanceLogValidators,
  validationMiddleware,
  createMaintenanceLogsController,
);
router.get('/', getAllMaintenanceLogsController);

router.get(
  '/robot/:id',
  uuidParamValidator,
  validationMiddleware,
  getMaintenanceLogsByRobotIdController,
);

router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getMaintenanceLogByIdController,
);

router.patch(
  '/:id',
  idParamValidator,
  updateRobotMaintenanceLogValidators,
  validationMiddleware,
  updateMaintenanceLogController,
);

router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deleteMaintenanceLogController,
);

export default router;
