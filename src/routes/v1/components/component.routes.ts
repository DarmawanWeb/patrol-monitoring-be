import express, { type Router } from 'express';
import {
  createComponentController,
  deleteComponentController,
  getAllComponentsController,
  getComponentByIdController,
  updateComponentController,
} from '@/controllers/components/components.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import {
  createComponentValidators,
  updateComponentValidators,
} from '@/validators/components/component.validator.js';
import { idParamValidator } from '@/validators/general.validators.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/', getAllComponentsController);
router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getComponentByIdController,
);
router.post(
  '/',
  createComponentValidators,
  validationMiddleware,
  createComponentController,
);
router.patch(
  '/:id',
  idParamValidator,
  updateComponentValidators,
  validationMiddleware,
  updateComponentController,
);
router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deleteComponentController,
);

export default router;
