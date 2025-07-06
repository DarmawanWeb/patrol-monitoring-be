import {
  type CreationOptional,
  DataTypes,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';
import { ComponentStatus } from '@/enums/component.enum';

interface ComponentDetailModel
  extends Model<
    InferAttributes<ComponentDetailModel>,
    InferCreationAttributes<ComponentDetailModel>
  > {
  serialNumber: string;
  name: string;
  componentsId: ForeignKey<number>;
  installedAt: Date;
  locationX: number;
  locationY: number;
  locationZ: number;
  status: ComponentStatus;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class ComponentDetail
  extends Model<
    InferAttributes<ComponentDetailModel>,
    InferCreationAttributes<ComponentDetailModel>
  >
  implements ComponentDetailModel
{
  declare serialNumber: string;
  declare name: string;
  declare componentsId: number;
  declare installedAt: Date;
  declare locationX: number;
  declare locationY: number;
  declare locationZ: number;
  declare status: ComponentStatus;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ComponentDetail.init(
  {
    serialNumber: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    componentsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'components',
        key: 'id',
      },
    },
    installedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    locationX: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    locationY: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    locationZ: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ComponentStatus.ACTIVE,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'ComponentDetail',
    tableName: 'component_details',
    timestamps: true,
  },
);

export default ComponentDetail;
