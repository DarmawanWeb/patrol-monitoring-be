import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface ComponentTypeModel
  extends Model<
    InferAttributes<ComponentTypeModel>,
    InferCreationAttributes<ComponentTypeModel>
  > {
  id: CreationOptional<number>;
  name: string;
  icon: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class ComponentType
  extends Model<
    InferAttributes<ComponentTypeModel>,
    InferCreationAttributes<ComponentTypeModel>
  >
  implements ComponentTypeModel
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare icon: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ComponentType.init(
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
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'ComponentType',
    tableName: 'component_types',
    timestamps: true,
  },
);

export default ComponentType;
