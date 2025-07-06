import {
  type CreationOptional,
  DataTypes,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface ComponentModel
  extends Model<
    InferAttributes<ComponentModel>,
    InferCreationAttributes<ComponentModel>
  > {
  id: CreationOptional<number>;
  name: string;
  typeId: ForeignKey<number>;
  model: string;
  manufacturer: string;
  warning_temp_threshold: number;
  overheat_temp_threshold: number;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class Component
  extends Model<
    InferAttributes<ComponentModel>,
    InferCreationAttributes<ComponentModel>
  >
  implements ComponentModel
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare typeId: ForeignKey<number>;
  declare model: string;
  declare manufacturer: string;
  declare warning_temp_threshold: number;
  declare overheat_temp_threshold: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Component.init(
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
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'component_types',
        key: 'id',
      },
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    warning_temp_threshold: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    overheat_temp_threshold: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Component',
    tableName: 'components',
    timestamps: true,
  },
);

export default Component;
