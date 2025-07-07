import { Router } from 'express';

const router: Router = Router();

import overheatDetectionRoutes from './overheat-detection.routes.js';
import patrolRouteRoutes from './patrol-route.routes.js';
import patrolScheduleRoutes from './patrol-schedule.routes.js';
import patrolSessionRoutes from './patrol-session.routes.js';
import routeWaypointRoutes from './route-waypoint.routes.js';

router.use('/routes', patrolRouteRoutes);
router.use('/waypoints', routeWaypointRoutes);
router.use('/schedules', patrolScheduleRoutes);
router.use('/sessions', patrolSessionRoutes);
router.use('/detections', overheatDetectionRoutes);

export default router;
