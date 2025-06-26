import Robot from './Robot.js';
import RobotType from './RobotType.js';

Robot.belongsTo(RobotType, { foreignKey: 'typeId', as: 'type' });
RobotType.hasMany(Robot, { foreignKey: 'typeId', as: 'robots' });

export default Robot;
