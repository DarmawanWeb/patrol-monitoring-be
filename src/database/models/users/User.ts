import sequelize from '@config/database.js';
import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import { Role } from '@/enums/role.enum';

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
  role: Role;
  active: CreationOptional<boolean>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class User
  extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>
  implements UserModel
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: Role;
  declare active: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(Role.ADMIN, Role.USER, Role.SUPER_ADMIN, Role.GUEST),
      allowNull: false,
      defaultValue: Role.GUEST,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  },
);

export default User;
