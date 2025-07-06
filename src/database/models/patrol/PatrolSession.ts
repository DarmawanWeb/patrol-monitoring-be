import {
  type CreationOptional,
  DataTypes,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';
import { PatrolStatus } from '@/enums/patrol.enum';

interface PatrolSessionModel
  extends Model<
    InferAttributes<PatrolSessionModel>,
    InferCreationAttributes<PatrolSessionModel>
  > {
  id: CreationOptional<number>;
  scheduleId: ForeignKey<number>;
  startTime: string;
  endTime: string;
  totalDistance: number;
  componentsInspected: number;
  anomaliesDetected: number;
  batteryStart: number;
  batteryEnd: number;
  status: PatrolStatus;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class PatrolSession
  extends Model<
    InferAttributes<PatrolSessionModel>,
    InferCreationAttributes<PatrolSessionModel>
  >
  implements PatrolSessionModel
{
  declare id: CreationOptional<number>;
  declare scheduleId: ForeignKey<number>;
  declare startTime: string;
  declare endTime: string;
  declare totalDistance: number;
  declare componentsInspected: number;
  declare anomaliesDetected: number;
  declare batteryStart: number;
  declare batteryEnd: number;
  declare status: PatrolStatus;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PatrolSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patrol_schedules',
        key: 'id',
      },
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    totalDistance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    componentsInspected: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    anomaliesDetected: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    batteryStart: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 100.0,
    },
    batteryEnd: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 100.0,
    },
    status: {
      type: DataTypes.ENUM(
        PatrolStatus.SCHEDULED,
        PatrolStatus.IN_PROGRESS,
        PatrolStatus.COMPLETED,
        PatrolStatus.FAILED,
      ),
      allowNull: false,
      defaultValue: PatrolStatus.SCHEDULED,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'PatrolSession',
    tableName: 'patrol_sessions',
    timestamps: true,
    underscored: true,
  },
);

export default PatrolSession;
