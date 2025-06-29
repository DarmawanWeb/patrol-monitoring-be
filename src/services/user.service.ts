import { User, RefreshToken } from '@/database/models/users/index.js';
import { NotFoundError } from '@/utils/base.error.js';
import type { IUser, UserUpdateInput } from '@/types/user';

class UserService {
  async getAllUsers(): Promise<IUser[]> {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role'],
      include: [
        {
          model: RefreshToken,
          as: 'refreshTokens',
          attributes: ['token', 'expiresAt'],
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return users.map((user) => {
      const plainUser = user.toJSON() as {
        id: number;
        name: string;
        email: string;
        role: string;
        refreshTokens?: RefreshToken[];
      };

      const active = (plainUser.refreshTokens?.length ?? 0) > 0;

      return {
        id: plainUser.id,
        name: plainUser.name,
        email: plainUser.email,
        role: plainUser.role,
        active,
      };
    });
  }

  async updateUserData(id: number, data: UserUpdateInput): Promise<IUser> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const updateData: Partial<Pick<IUser, 'name' | 'email' | 'role'>> = {};

    if (data.name) updateData.name = data.name.trim();
    if (data.email) updateData.email = data.email.trim();
    if (data.role) updateData.role = data.role;

    await user.update(updateData);

    const updatedUser = user.toJSON();
    delete updatedUser.password;

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      active: true,
    };
  }

  async deleteUser(id: number): Promise<void> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    await user.destroy();
  }
}

export default UserService;
