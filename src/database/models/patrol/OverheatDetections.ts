import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface OverheatDetectionModel
  extends Model<
    InferAttributes<OverheatDetectionModel>,
    InferCreationAttributes<OverheatDetectionModel>
  > {
  id: CreationOptional<number>;
  name: string;
  sessionId: number;
  temperature: number;
  severityLevel: string;
  thermalImagePath: string;
  rgbImagePath: string;
  locationX: number;
  locationY: number;
  orientationZ: number;
  confidenceScore: number;
  isConfirmed: boolean;
  confirmedBy: CreationOptional<number>;
  confirmedAt: CreationOptional<Date>;
  resolutionStatus: string;
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
  declare sessionId: number;
  declare temperature: number;
  declare severityLevel: string;
  declare thermalImagePath: string;
  declare rgbImagePath: string;
  declare locationX: number;
  declare locationY: number;
  declare orientationZ: number;
  declare confidenceScore: number;
  declare isConfirmed: boolean;
  declare confirmedBy: CreationOptional<number>;
  declare confirmedAt: CreationOptional<Date>;
  declare resolutionStatus: string;
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
      validate: {
        notEmpty: true,
        len: [5, 50],
      },
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PatrolSession',
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['low', 'medium', 'high']],
      },
    },
    thermalImagePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rgbImagePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locationX: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    locationY: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orientationZ: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: -180,
        max: 180,
      },
    },
    confidenceScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 1,
      },
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
        model: 'User',
        key: 'id',
      },
    },
    confirmedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    resolutionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['unresolved', 'resolved', 'in_progress']],
      },
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
    tableName: 'patrol_routes',
    timestamps: true,
  },
);

export default OverheatDetection;
