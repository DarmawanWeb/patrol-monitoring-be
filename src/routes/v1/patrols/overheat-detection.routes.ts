import express, { type Router } from 'express';
import {
  createOverheatDetectionController,
  deleteOverheatDetectionController,
  getAllOverheatDetectionsController,
  getOverheatDetectionByIdController,
  getOverheatDetectionsBySessionIdController,
  getOverheatDetectionsByWaypointIdController,
  updateOverheatDetectionController,
} from '@/controllers/patrols/overheat-detections.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import { idParamValidator } from '@/validators/general.validators.js';
import {
  sessionIdParamValidator,
  waypointIdParamValidator,
} from '@/validators/patrols/overheat-detection.validator.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/', getAllOverheatDetectionsController);

router.get(
  '/session/:sessionId',
  sessionIdParamValidator,
  validationMiddleware,
  getOverheatDetectionsBySessionIdController,
);

router.get(
  '/waypoint/:waypointId',
  waypointIdParamValidator,
  validationMiddleware,
  getOverheatDetectionsByWaypointIdController,
);

router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getOverheatDetectionByIdController,
);

router.post('/', createOverheatDetectionController);

router.patch('/:id', updateOverheatDetectionController);

router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deleteOverheatDetectionController,
);

export default router;
