import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';

// start_time TIMESTAMP WITH TIME ZONE NOT NULL,
//     end_time TIMESTAMP WITH TIME ZONE,
//     status VARCHAR(20) CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'failed')) DEFAULT 'scheduled',
//     total_distance DECIMAL(10,2),
//     total_duration INTEGER, -- in minutes
//     components_inspected INTEGER DEFAULT 0,
//     anomalies_detected INTEGER DEFAULT 0,
//     battery_start DECIMAL(5,2),
//     battery_end DECIMAL(5,2),
//     notes TEXT,

interface PatrolSessionModel
  extends Model<
    InferAttributes<PatrolSessionModel>,
    InferCreationAttributes<PatrolSessionModel>
  > {
  id: CreationOptional<number>;
  scheduleId: number;
  startTime: string;
  endTime: string;
  totalDistance: number;
  componentsInspected: number;
  anomaliesDetected: number;
  batteryStart: number;
  batteryEnd: number;
  status: string;
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
  declare scheduleId: number;
  declare startTime: string;
  declare endTime: string;
  declare totalDistance: number;
  declare componentsInspected: number;
  declare anomaliesDetected: number;
  declare batteryStart: number;
  declare batteryEnd: number;
  declare status: string;
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
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'scheduled',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'PatrolSession',
    tableName: 'patrol_schedules',
    timestamps: true,
    underscored: true,
  },
);

export default PatrolSession;
