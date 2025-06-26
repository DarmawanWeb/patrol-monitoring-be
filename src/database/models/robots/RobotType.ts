import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface RobotTypeModel
  extends Model<
    InferAttributes<RobotTypeModel>,
    InferCreationAttributes<RobotTypeModel>
  > {
  id: CreationOptional<number>;
  name: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class RobotType
  extends Model<
    InferAttributes<RobotTypeModel>,
    InferCreationAttributes<RobotTypeModel>
  >
  implements RobotTypeModel
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

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
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'RobotType',
    tableName: 'robot_types',
    timestamps: true,
  },
);

export default RobotType;
