import Robot from './Robot';
import RobotType from './RobotType';

Robot.belongsTo(RobotType, { foreignKey: 'typeId', as: 'type' });
RobotType.hasMany(Robot, { foreignKey: 'typeId', as: 'robots' });

export { Robot, RobotType };
