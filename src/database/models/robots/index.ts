import Robot from './Robot.js';
import RobotType from './RobotType.js';
import RobotWebsocket from './RobotWebsocket.js';

Robot.belongsTo(RobotType, { foreignKey: 'typeId', as: 'type' });
RobotType.hasMany(Robot, { foreignKey: 'typeId', as: 'robots' });

RobotWebsocket.belongsTo(Robot, { foreignKey: 'robotId', as: 'robot' });
Robot.hasMany(RobotWebsocket, { foreignKey: 'robotId', as: 'websockets' });

export { Robot, RobotType, RobotWebsocket };
