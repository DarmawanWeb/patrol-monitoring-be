import PatrolSchedule from '../patrols/PatrolSchedule.js';
import Robot from './Robot.js';
import RobotMaintenanceLog from './RobotMaintenanceLog.js';
import RobotType from './RobotType.js';
import RobotWebsocket from './RobotWebsocket.js';

/* RobotType 1 ── n Robot */
Robot.belongsTo(RobotType, { foreignKey: 'typeId', as: 'type' });
RobotType.hasMany(Robot, { foreignKey: 'typeId', as: 'robots' });

/* Robot 1 ── n RobotWebsocket */
Robot.hasMany(RobotWebsocket, { foreignKey: 'robotId', as: 'websockets' });
RobotWebsocket.belongsTo(Robot, { foreignKey: 'robotId', as: 'robot' });

/* Robot 1 ── n RobotMaintenanceLog */
Robot.hasMany(RobotMaintenanceLog, {
  foreignKey: 'robotId',
  as: 'maintenanceLogs',
});
RobotMaintenanceLog.belongsTo(Robot, { foreignKey: 'robotId', as: 'robot' });

/* Robot 1 ── n PatrolSchedule */
Robot.hasMany(PatrolSchedule, { foreignKey: 'robotId', as: 'schedules' });
PatrolSchedule.belongsTo(Robot, { foreignKey: 'robotId', as: 'robot' });

export { Robot, RobotType, RobotWebsocket, RobotMaintenanceLog };
