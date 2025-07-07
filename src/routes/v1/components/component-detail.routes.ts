import express, { type Router } from 'express';
import {
  createComponentDetailController,
  deleteComponentDetailController,
  getAllComponentDetailsController,
  getComponentDetailBySerialNumberController,
  getComponentDetailsByComponentIdController,
  updateComponentDetailController,
} from '@/controllers/components/component-details.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import {
  componentIdParamValidator,
  createComponentDetailValidators,
  serialNumberParamValidator,
  updateComponentDetailValidators,
} from '@/validators/components/component-detail.validator.js';

const router: Router = express.Router();

router.use(authMiddleware);

// Get all component details
router.get('/', getAllComponentDetailsController);

// Get component details by component ID
router.get(
  '/component/:componentId',
  componentIdParamValidator,
  validationMiddleware,
  getComponentDetailsByComponentIdController,
);

// Get component detail by serial number
router.get(
  '/:serialNumber',
  serialNumberParamValidator,
  validationMiddleware,
  getComponentDetailBySerialNumberController,
);

// Create component detail
router.post(
  '/',
  createComponentDetailValidators,
  validationMiddleware,
  createComponentDetailController,
);

// Update component detail
router.patch(
  '/:serialNumber',
  serialNumberParamValidator,
  updateComponentDetailValidators,
  validationMiddleware,
  updateComponentDetailController,
);

// Delete component detail
router.delete(
  '/:serialNumber',
  serialNumberParamValidator,
  validationMiddleware,
  deleteComponentDetailController,
);

export default router;
