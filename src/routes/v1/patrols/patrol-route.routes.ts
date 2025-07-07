import express, { type Router } from 'express';
import {
  createPatrolRouteController,
  deletePatrolRouteController,
  getAllPatrolRoutesController,
  getPatrolRouteByIdController,
  updatePatrolRouteController,
} from '@/controllers/patrols/patrol-routes.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import { idParamValidator } from '@/validators/general.validators.js';
import {
  createPatrolRouteValidators,
  updatePatrolRouteValidators,
} from '@/validators/patrols/patrol-route.validator.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/', getAllPatrolRoutesController);
router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getPatrolRouteByIdController,
);
router.post(
  '/',
  createPatrolRouteValidators,
  validationMiddleware,
  createPatrolRouteController,
);
router.patch(
  '/:id',
  idParamValidator,
  updatePatrolRouteValidators,
  validationMiddleware,
  updatePatrolRouteController,
);
router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deletePatrolRouteController,
);

export default router;
