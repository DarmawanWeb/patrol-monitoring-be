import express, { type Router } from 'express';
import {
  createPatrolSessionController,
  deletePatrolSessionController,
  getAllPatrolSessionsController,
  getPatrolSessionByIdController,
  getPatrolSessionsByScheduleIdController,
  updatePatrolSessionController,
} from '@/controllers/patrols/patrol-sessions.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import { idParamValidator } from '@/validators/general.validators.js';
import {
  createPatrolSessionValidators,
  scheduleIdParamValidator,
  updatePatrolSessionValidators,
} from '@/validators/patrols/patrol-session.validator.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/', getAllPatrolSessionsController);

router.get(
  '/schedule/:scheduleId',
  scheduleIdParamValidator,
  validationMiddleware,
  getPatrolSessionsByScheduleIdController,
);

router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getPatrolSessionByIdController,
);

router.post(
  '/',
  createPatrolSessionValidators,
  validationMiddleware,
  createPatrolSessionController,
);

router.patch(
  '/:id',
  idParamValidator,
  updatePatrolSessionValidators,
  validationMiddleware,
  updatePatrolSessionController,
);

router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deletePatrolSessionController,
);

export default router;
