import express, { type Router } from 'express';
import {
  createRouteWaypointController,
  deleteRouteWaypointController,
  getAllRouteWaypointsController,
  getRouteWaypointByIdController,
  getRouteWaypointsByRouteIdController,
  updateRouteWaypointController,
} from '@/controllers/patrols/route-waypoints.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import { idParamValidator } from '@/validators/general.validators.js';
import {
  createRouteWaypointValidators,
  routeIdParamValidator,
  updateRouteWaypointValidators,
} from '@/validators/patrols/route-waypoint.validator.js';

const router: Router = express.Router();

router.use(authMiddleware);

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

export default router;
