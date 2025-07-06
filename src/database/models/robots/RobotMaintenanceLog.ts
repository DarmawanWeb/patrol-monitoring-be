import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface RobotMaintenanceLogModel
  extends Model<
    InferAttributes<RobotMaintenanceLogModel>,
    InferCreationAttributes<RobotMaintenanceLogModel>
  > {
  id: CreationOptional<number>;
  robotId: string;
  description?: CreationOptional<string>;
  performedAt: Date;
  performedBy: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class RobotMaintenanceLog
  extends Model<
    InferAttributes<RobotMaintenanceLogModel>,
    InferCreationAttributes<RobotMaintenanceLogModel>
  >
  implements RobotMaintenanceLogModel
{
  declare id: CreationOptional<number>;
  declare robotId: string;
  declare description?: CreationOptional<string>;
  declare performedAt: Date;
  declare performedBy: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

RobotMaintenanceLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    robotId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'robots',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    performedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    performedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'RobotMaintenanceLog',
    tableName: 'robot_maintenance_logs',
    timestamps: true,
  },
);

export default RobotMaintenanceLog;
