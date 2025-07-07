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

router.get('/', getAllComponentDetailsController);

router.get(
  '/component/:componentId',
  componentIdParamValidator,
  validationMiddleware,
  getComponentDetailsByComponentIdController,
);

router.get(
  '/:serialNumber',
  serialNumberParamValidator,
  validationMiddleware,
  getComponentDetailBySerialNumberController,
);

router.post(
  '/',
  createComponentDetailValidators,
  validationMiddleware,
  createComponentDetailController,
);

router.patch(
  '/:serialNumber',
  serialNumberParamValidator,
  updateComponentDetailValidators,
  validationMiddleware,
  updateComponentDetailController,
);

router.delete(
  '/:serialNumber',
  serialNumberParamValidator,
  validationMiddleware,
  deleteComponentDetailController,
);

export default router;
