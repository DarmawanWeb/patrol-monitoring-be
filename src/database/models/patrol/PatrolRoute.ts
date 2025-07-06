import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface PatrolRouteModel
  extends Model<
    InferAttributes<PatrolRouteModel>,
    InferCreationAttributes<PatrolRouteModel>
  > {
  id: CreationOptional<number>;
  name: string;
  description: string;
  total_distance: number;
  estimated_duration: number;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class PatrolRoute
  extends Model<
    InferAttributes<PatrolRouteModel>,
    InferCreationAttributes<PatrolRouteModel>
  >
  implements PatrolRouteModel
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare total_distance: number;
  declare estimated_duration: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PatrolRoute.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    total_distance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    estimated_duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'PatrolRoute',
    tableName: 'patrol_routes',
    timestamps: true,
  },
);

export default PatrolRoute;
