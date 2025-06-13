import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database.js';

class RobotType extends Model {}

RobotType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Robot',
    tableName: 'robots',
    timestamps: true,
  },
);

export default RobotType;
