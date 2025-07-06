import Robot from './Robot.js';
import RobotMaintenanceLog from './RobotMaintenanceLog.js';
import RobotType from './RobotType.js';
import RobotWebsocket from './RobotWebsocket.js';

Robot.belongsTo(RobotType, { foreignKey: 'typeId', as: 'type' });
RobotType.hasMany(Robot, { foreignKey: 'typeId', as: 'robots' });

RobotWebsocket.belongsTo(Robot, { foreignKey: 'robotId', as: 'robot' });
Robot.hasMany(RobotWebsocket, { foreignKey: 'robotId', as: 'websockets' });

RobotMaintenanceLog.belongsTo(Robot, { foreignKey: 'robotId', as: 'robot' });
Robot.hasMany(RobotMaintenanceLog, {
  foreignKey: 'robotId',
  as: 'maintenanceLogs',
});

export { Robot, RobotType, RobotWebsocket, RobotMaintenanceLog };
