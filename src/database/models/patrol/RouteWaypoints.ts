import {
  type CreationOptional,
  DataTypes,
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
  routeId: number;
  sequenceOrder: number;
  locationX: number;
  locationY: number;
  orientationZ: number;
  waypointType: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class PatrolRoute
  extends Model<
    InferAttributes<RouteWaypointModel>,
    InferCreationAttributes<RouteWaypointModel>
  >
  implements RouteWaypointModel
{
  declare id: CreationOptional<number>;
  declare routeId: number;
  declare sequenceOrder: number;
  declare locationX: number;
  declare locationY: number;
  declare orientationZ: number;
  declare waypointType: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare sequence_order: number;
}

PatrolRoute.init(
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
        model: 'PatrolRoute',
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
      validate: {
        min: -180,
        max: 180,
      },
    },
    waypointType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'PatrolRoute',
    tableName: 'PatrolRoute',
    timestamps: true,
  },
);

export default PatrolRoute;
