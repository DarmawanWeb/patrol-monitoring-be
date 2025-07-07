import OverheatDetection from './OverheatDetection.js';
import PatrolRoute from './PatrolRoute.js';
import PatrolSchedule from './PatrolSchedule.js';
import PatrolSession from './PatrolSession.js';
import RouteWaypoint from './RouteWaypoint.js';

/* PatrolRoute 1 ── n RouteWaypoint */
PatrolRoute.hasMany(RouteWaypoint, { foreignKey: 'routeId', as: 'waypoints' });
RouteWaypoint.belongsTo(PatrolRoute, { foreignKey: 'routeId', as: 'route' });

/* PatrolRoute 1 ── n PatrolSchedule */
PatrolRoute.hasMany(PatrolSchedule, { foreignKey: 'routeId', as: 'schedules' });
PatrolSchedule.belongsTo(PatrolRoute, { foreignKey: 'routeId', as: 'route' });

/* PatrolSchedule 1 ── n PatrolSession */
PatrolSchedule.hasMany(PatrolSession, {
  foreignKey: 'scheduleId',
  as: 'sessions',
});
PatrolSession.belongsTo(PatrolSchedule, {
  foreignKey: 'scheduleId',
  as: 'schedule',
});

/* PatrolSession 1 ── n OverheatDetection */
PatrolSession.hasMany(OverheatDetection, {
  foreignKey: 'sessionId',
  as: 'overheatDetections',
});
OverheatDetection.belongsTo(PatrolSession, {
  foreignKey: 'sessionId',
  as: 'session',
});

/* RouteWaypoint 1 ── n OverheatDetection */
RouteWaypoint.hasMany(OverheatDetection, {
  foreignKey: 'waypointId',
  as: 'overheatDetections',
});
OverheatDetection.belongsTo(RouteWaypoint, {
  foreignKey: 'waypointId',
  as: 'waypoint',
});

export {
  PatrolRoute,
  RouteWaypoint,
  PatrolSchedule,
  PatrolSession,
  OverheatDetection,
};
