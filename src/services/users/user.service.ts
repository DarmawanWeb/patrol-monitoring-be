import { RefreshToken, User } from '@/database/models/users/index.js';
import type { IUser, UserUpdateInput } from '@/types/users/user.js';
import { NotFoundError } from '@/utils/base.error.js';

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

    if (data.name) {
      user.name = data.name.trim();
    }
    if (data.email) {
      user.email = data.email.trim();
    }
    if (data.role) {
      user.role = data.role;
    }

    await user.save();

    const updatedUser = user.toJSON();
    const { password, ...userWithoutPassword } = updatedUser;

    return {
      id: userWithoutPassword.id,
      name: userWithoutPassword.name,
      email: userWithoutPassword.email,
      role: userWithoutPassword.role,
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
