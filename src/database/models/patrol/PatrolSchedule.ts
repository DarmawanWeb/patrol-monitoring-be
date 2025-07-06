import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface PatrolScheduleModel
  extends Model<
    InferAttributes<PatrolScheduleModel>,
    InferCreationAttributes<PatrolScheduleModel>
  > {
  id: CreationOptional<number>;
  robotId: number;
  routeId: number;
  scheduleType: string;
  startTime: string;
  intervalMinutes: CreationOptional<number>;
  daysOfWeek: CreationOptional<number[]>;
  daysOfMonth: CreationOptional<number[]>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class PatrolSchedule
  extends Model<
    InferAttributes<PatrolScheduleModel>,
    InferCreationAttributes<PatrolScheduleModel>
  >
  implements PatrolScheduleModel
{
  declare id: CreationOptional<number>;
  declare robotId: number;
  declare routeId: number;
  declare scheduleType: string;
  declare startTime: string;
  declare intervalMinutes: CreationOptional<number>;
  declare daysOfWeek: CreationOptional<number[]>;
  declare daysOfMonth: CreationOptional<number[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PatrolSchedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    robotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    scheduleType: {
      type: DataTypes.ENUM('once', 'daily', 'weekly', 'monthly'),
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    intervalMinutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    daysOfWeek: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    daysOfMonth: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'PatrolSchedule',
    tableName: 'patrol_schedules',
    timestamps: true,
    underscored: true,
  },
);

export default PatrolSchedule;
