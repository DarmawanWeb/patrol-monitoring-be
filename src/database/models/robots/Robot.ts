import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import sequelize from '@/config/database.js';
import RobotType from './RobotType.js';

interface RobotModel
  extends Model<
    InferAttributes<RobotModel>,
    InferCreationAttributes<RobotModel>
  > {
  id: CreationOptional<string>;
  name: string;
  imagePath: string;
  typeId: ForeignKey<number>;
  description: string | null;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class Robot
  extends Model<
    InferAttributes<RobotModel>,
    InferCreationAttributes<RobotModel>
  >
  implements RobotModel
{
  declare id: CreationOptional<string>;
  declare name: string;
  declare imagePath: string;
  declare typeId: ForeignKey<number>;
  declare description: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Robot.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'robot_types',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Robot',
    tableName: 'robots',
    timestamps: true,
  },
);

Robot.belongsTo(RobotType, { foreignKey: 'typeId', as: 'type' });
RobotType.hasMany(Robot, { foreignKey: 'typeId', as: 'robots' });

export default Robot;
