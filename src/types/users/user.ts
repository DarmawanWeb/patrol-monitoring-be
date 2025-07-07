import type { Role } from '@/enums/role.enum.js';

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserUpdateInput = Partial<
  Pick<UserAttributes, 'name' | 'email' | 'role'>
>;

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}
