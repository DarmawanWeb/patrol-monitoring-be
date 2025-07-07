import express, { type Router } from 'express';
import {
  createComponentTypeController,
  deleteComponentTypeController,
  getAllComponentTypesController,
  getComponentTypeByIdController,
  updateComponentTypeController,
} from '@/controllers/components/component-types.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import {
  createComponentTypeValidators,
  updateComponentTypeValidators,
} from '@/validators/components/component-type.validator.js';
import { idParamValidator } from '@/validators/general.validators.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/', getAllComponentTypesController);
router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getComponentTypeByIdController,
);
router.post(
  '/',
  createComponentTypeValidators,
  validationMiddleware,
  createComponentTypeController,
);
router.patch(
  '/:id',
  idParamValidator,
  updateComponentTypeValidators,
  validationMiddleware,
  updateComponentTypeController,
);
router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deleteComponentTypeController,
);

export default router;
