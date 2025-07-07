import {
  type CreationOptional,
  DataTypes,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';
import { ResolutionStatus, SeverityLevel } from '@/enums/result.enum.js';

interface OverheatDetectionModel
  extends Model<
    InferAttributes<OverheatDetectionModel>,
    InferCreationAttributes<OverheatDetectionModel>
  > {
  id: CreationOptional<number>;
  name: string;
  sessionId: ForeignKey<number>;
  waypointId: ForeignKey<number>;
  temperature: number;
  severityLevel: SeverityLevel;
  thermalImagePath?: string;
  rgbImagePath?: string;
  confidenceScore: number;
  isConfirmed: boolean;
  confirmedBy: CreationOptional<number>;
  confirmedAt: CreationOptional<Date>;
  resolutionStatus: ResolutionStatus;
  resolutionNotes: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class OverheatDetection
  extends Model<
    InferAttributes<OverheatDetectionModel>,
    InferCreationAttributes<OverheatDetectionModel>
  >
  implements OverheatDetectionModel
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare sessionId: ForeignKey<number>;
  declare waypointId: ForeignKey<number>;
  declare temperature: number;
  declare severityLevel: SeverityLevel;
  declare thermalImagePath?: string;
  declare rgbImagePath?: string;
  declare confidenceScore: number;
  declare isConfirmed: boolean;
  declare confirmedBy: CreationOptional<number>;
  declare confirmedAt: CreationOptional<Date>;
  declare resolutionStatus: ResolutionStatus;
  declare resolutionNotes: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

OverheatDetection.init(
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
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patrol_sessions',
        key: 'id',
      },
    },
    waypointId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'route_waypoints',
        key: 'id',
      },
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    severityLevel: {
      type: DataTypes.ENUM(
        SeverityLevel.LOW,
        SeverityLevel.MEDIUM,
        SeverityLevel.HIGH,
      ),
      allowNull: false,
      defaultValue: SeverityLevel.LOW,
    },
    thermalImagePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rgbImagePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confidenceScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    confirmedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    confirmedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    resolutionStatus: {
      type: DataTypes.ENUM(
        ResolutionStatus.IN_PROGRESS,
        ResolutionStatus.RESOLVED,
        ResolutionStatus.UNRESOLVED,
      ),
      allowNull: false,
      defaultValue: ResolutionStatus.UNRESOLVED,
    },
    resolutionNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'OverheatDetection',
    tableName: 'overheat_detections',
    timestamps: true,
  },
);

export default OverheatDetection;
