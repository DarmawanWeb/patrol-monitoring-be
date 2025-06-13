import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database.js';

class PatrolArea extends Model {}

PatrolArea.init(
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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mapCenterLat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    mapCenterLng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cargingDockLat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cargingDockLng: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cargingDockYaw: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PatrolArea',
    tableName: 'patrol_areas',
    timestamps: true,
  },
);

export default PatrolArea;
