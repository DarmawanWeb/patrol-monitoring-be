import express, { type Router } from 'express';
import {
  createMultipleRouteWaypointsController,
  createRouteWaypointController,
  deleteRouteWaypointController,
  deleteRouteWaypointsByRouteIdController,
  getAllRouteWaypointsController,
  getRouteWaypointByIdController,
  getRouteWaypointsByRouteIdController,
  updateRouteWaypointController,
} from '@/controllers/patrols/route-waypoints.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import { idParamValidator } from '@/validators/general.validators.js';
import {
  createMultipleRouteWaypointsValidators,
  createRouteWaypointValidators,
  routeIdParamValidator,
  updateRouteWaypointValidators,
} from '@/validators/patrols/route-waypoint.validator.js';

const router: Router = express.Router();

router.use(authMiddleware);

// Get all route waypoints
router.get('/', getAllRouteWaypointsController);

router.get(
  '/route/:routeId',
  routeIdParamValidator,
  validationMiddleware,
  getRouteWaypointsByRouteIdController,
);

router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getRouteWaypointByIdController,
);

router.post(
  '/',
  createRouteWaypointValidators,
  validationMiddleware,
  createRouteWaypointController,
);

router.post(
  '/bulk',
  createMultipleRouteWaypointsValidators,
  validationMiddleware,
  createMultipleRouteWaypointsController,
);

router.patch(
  '/:id',
  idParamValidator,
  updateRouteWaypointValidators,
  validationMiddleware,
  updateRouteWaypointController,
);

router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deleteRouteWaypointController,
);

router.delete(
  '/route/:routeId',
  routeIdParamValidator,
  validationMiddleware,
  deleteRouteWaypointsByRouteIdController,
);

export default router;
