import express, { type Router } from 'express';
import {
  createComponentMaintenanceLogController,
  deleteComponentMaintenanceLogController,
  getAllComponentMaintenanceLogsController,
  getComponentMaintenanceLogByIdController,
  getComponentMaintenanceLogsBySerialNumberController,
  updateComponentMaintenanceLogController,
} from '@/controllers/components/component-maintenance-logs.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import {
  createComponentMaintenanceLogValidators,
  serialNumberParamValidator,
  updateComponentMaintenanceLogValidators,
} from '@/validators/components/component-maintenance-log.validator.js';
import { idParamValidator } from '@/validators/general.validators.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/', getAllComponentMaintenanceLogsController);

router.get(
  '/component/:serialNumber',
  serialNumberParamValidator,
  validationMiddleware,
  getComponentMaintenanceLogsBySerialNumberController,
);

router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getComponentMaintenanceLogByIdController,
);

router.post(
  '/',
  createComponentMaintenanceLogValidators,
  validationMiddleware,
  createComponentMaintenanceLogController,
);

router.patch(
  '/:id',
  idParamValidator,
  updateComponentMaintenanceLogValidators,
  validationMiddleware,
  updateComponentMaintenanceLogController,
);

router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deleteComponentMaintenanceLogController,
);

export default router;
