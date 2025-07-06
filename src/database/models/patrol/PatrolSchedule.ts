import {
  type CreationOptional,
  DataTypes,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';
import { ScheduleType } from '@/enums/schedule.enum';

interface PatrolScheduleModel
  extends Model<
    InferAttributes<PatrolScheduleModel>,
    InferCreationAttributes<PatrolScheduleModel>
  > {
  id: CreationOptional<number>;
  robotId: ForeignKey<string>;
  routeId: ForeignKey<number>;
  scheduleType: ScheduleType;
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
  declare robotId: ForeignKey<string>;
  declare routeId: ForeignKey<number>;
  declare scheduleType: ScheduleType;
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
      references: {
        model: 'robots',
        key: 'id',
      },
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patrol_routes',
        key: 'id',
      },
    },
    scheduleType: {
      type: DataTypes.ENUM(
        ScheduleType.ONCE,
        ScheduleType.DAILY,
        ScheduleType.WEEKLY,
        ScheduleType.MONTHLY,
      ),
      defaultValue: ScheduleType.ONCE,
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
