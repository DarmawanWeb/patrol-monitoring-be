import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface RobotWebsocketModel
  extends Model<
    InferAttributes<RobotWebsocketModel>,
    InferCreationAttributes<RobotWebsocketModel>
  > {
  id: CreationOptional<number>;
  robotId: string;
  locationX: number;
  locationY: number;
  speed: number;
  status: string;
  panAngle: number;
  tiltAngle: number;
  zoomRgb: number;
  zoomThermal: number;
  batteryLevel: number;
  signalStrength: number;
  temperature: number;
  rgbCameraStatus: boolean;
  thermalCameraStatus: boolean;
  acusticCameraStatus: boolean;
  lidarStatus: boolean;
  imuStatus: boolean;
  timeStamp: Date;
}

class RobotWebsocket
  extends Model<
    InferAttributes<RobotWebsocketModel>,
    InferCreationAttributes<RobotWebsocketModel>
  >
  implements RobotWebsocketModel
{
  declare id: CreationOptional<number>;
  declare robotId: string;
  declare locationX: number;
  declare locationY: number;
  declare speed: number;
  declare status: string;
  declare panAngle: number;
  declare tiltAngle: number;
  declare zoomRgb: number;
  declare zoomThermal: number;
  declare batteryLevel: number;
  declare signalStrength: number;
  declare temperature: number;
  declare rgbCameraStatus: boolean;
  declare thermalCameraStatus: boolean;
  declare acusticCameraStatus: boolean;
  declare lidarStatus: boolean;
  declare imuStatus: boolean;
  declare timeStamp: Date;
}

RobotWebsocket.init(
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
    locationX: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    locationY: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    speed: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    panAngle: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tiltAngle: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    zoomRgb: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    zoomThermal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    batteryLevel: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    signalStrength: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    rgbCameraStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    thermalCameraStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    acusticCameraStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    lidarStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    imuStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    timeStamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'RobotWebsocket',
    tableName: 'robot_websockets',
    timestamps: false,
  },
);
export default RobotWebsocket;
