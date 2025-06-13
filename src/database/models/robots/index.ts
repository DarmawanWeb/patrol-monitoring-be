import Robot from './Robot.js';
import RobotType from './RobotType.js';

RobotType.hasMany(Robot, { foreignKey: 'typeId', as: 'robot' });
Robot.belongsTo(RobotType, { foreignKey: 'typeId', as: 'type' });

export { Robot, RobotType };
