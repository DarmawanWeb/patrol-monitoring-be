import {
  type CreationOptional,
  DataTypes,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface ComponentMaintenanceLogModel
  extends Model<
    InferAttributes<ComponentMaintenanceLogModel>,
    InferCreationAttributes<ComponentMaintenanceLogModel>
  > {
  id: CreationOptional<number>;
  componentSerialNumber: ForeignKey<string>;
  description: CreationOptional<string | null>;
  performedAt: Date;
  performedBy: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class ComponentMaintenanceLog
  extends Model<
    InferAttributes<ComponentMaintenanceLogModel>,
    InferCreationAttributes<ComponentMaintenanceLogModel>
  >
  implements ComponentMaintenanceLogModel
{
  declare id: CreationOptional<number>;
  declare componentSerialNumber: ForeignKey<string>;
  declare description: CreationOptional<string | null>;
  declare performedAt: Date;
  declare performedBy: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ComponentMaintenanceLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    componentSerialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'component_details',
        key: 'serialNumber',
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
    modelName: 'ComponentMaintenanceLog',
    tableName: 'component_maintenance_logs',
    timestamps: true,
  },
);

export default ComponentMaintenanceLog;
