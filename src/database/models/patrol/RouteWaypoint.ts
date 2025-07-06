import {
  type CreationOptional,
  DataTypes,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface RouteWaypointModel
  extends Model<
    InferAttributes<RouteWaypointModel>,
    InferCreationAttributes<RouteWaypointModel>
  > {
  id: CreationOptional<number>;
  routeId: ForeignKey<number>;
  sequenceOrder: number;
  locationX: number;
  locationY: number;
  orientationZ: number;
  waypointType: string;
  cameraPan: CreationOptional<number>;
  cameraTilt: CreationOptional<number>;
  rgbCameraZoom: CreationOptional<number>;
  thermalCameraZoom: CreationOptional<number>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class RouteWaypoint
  extends Model<
    InferAttributes<RouteWaypointModel>,
    InferCreationAttributes<RouteWaypointModel>
  >
  implements RouteWaypointModel
{
  declare id: CreationOptional<number>;
  declare routeId: ForeignKey<number>;
  declare sequenceOrder: number;
  declare locationX: number;
  declare locationY: number;
  declare orientationZ: number;
  declare waypointType: string;
  declare cameraPan: CreationOptional<number>;
  declare cameraTilt: CreationOptional<number>;
  declare rgbCameraZoom: CreationOptional<number>;
  declare thermalCameraZoom: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare sequence_order: number;
}

RouteWaypoint.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patrol_routes',
        key: 'id',
      },
    },
    sequenceOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
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
    orientationZ: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    waypointType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cameraPan: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cameraTilt: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    rgbCameraZoom: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    thermalCameraZoom: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'RouteWaypoint',
    tableName: 'route_waypoints',
    timestamps: true,
  },
);

export default RouteWaypoint;
