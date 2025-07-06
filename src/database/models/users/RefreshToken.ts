import sequelize from '@config/database.js';
import {
  type CreationOptional,
  DataTypes,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';

interface RefreshTokenModel
  extends Model<
    InferAttributes<RefreshTokenModel>,
    InferCreationAttributes<RefreshTokenModel>
  > {
  id: CreationOptional<number>;
  userId: ForeignKey<number>;
  token: string;
  expiresAt: Date;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class RefreshToken
  extends Model<
    InferAttributes<RefreshTokenModel>,
    InferCreationAttributes<RefreshTokenModel>
  >
  implements RefreshTokenModel
{
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<number>;
  declare token: string;
  declare expiresAt: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens',
    timestamps: true,
  },
);

export default RefreshToken;
