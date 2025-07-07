import express, { type Router } from 'express';
import {
  createPatrolScheduleController,
  deletePatrolScheduleController,
  getAllPatrolSchedulesController,
  getPatrolScheduleByIdController,
  getPatrolSchedulesByRobotIdController,
  updatePatrolScheduleController,
} from '@/controllers/patrols/patrol-schedules.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import { idParamValidator } from '@/validators/general.validators.js';
import {
  createPatrolScheduleValidators,
  robotIdParamValidator,
  updatePatrolScheduleValidators,
} from '@/validators/patrols/patrol-schedule.validator.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/', getAllPatrolSchedulesController);

router.get(
  '/robot/:robotId',
  robotIdParamValidator,
  validationMiddleware,
  getPatrolSchedulesByRobotIdController,
);

router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getPatrolScheduleByIdController,
);

router.post(
  '/',
  createPatrolScheduleValidators,
  validationMiddleware,
  createPatrolScheduleController,
);

router.patch(
  '/:id',
  idParamValidator,
  updatePatrolScheduleValidators,
  validationMiddleware,
  updatePatrolScheduleController,
);

router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deletePatrolScheduleController,
);

export default router;
