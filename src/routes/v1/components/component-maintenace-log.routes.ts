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

// Get all component maintenance logs
router.get('/', getAllComponentMaintenanceLogsController);

// Get component maintenance logs by component serial number
router.get(
  '/component/:serialNumber',
  serialNumberParamValidator,
  validationMiddleware,
  getComponentMaintenanceLogsBySerialNumberController,
);

// Get component maintenance log by ID
router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getComponentMaintenanceLogByIdController,
);

// Create component maintenance log
router.post(
  '/',
  createComponentMaintenanceLogValidators,
  validationMiddleware,
  createComponentMaintenanceLogController,
);

// Update component maintenance log
router.patch(
  '/:id',
  idParamValidator,
  updateComponentMaintenanceLogValidators,
  validationMiddleware,
  updateComponentMaintenanceLogController,
);

// Delete component maintenance log
router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deleteComponentMaintenanceLogController,
);

export default router;
