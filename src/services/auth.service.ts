import bcrypt from 'bcryptjs';
import { Role } from '@/enums/role.enum.js';
import { User, RefreshToken } from '@/database/models/users/index.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@/utils/jwt.js';
import {
  AuthenticationError,
  ConflictError,
  NotFoundError,
} from '@/utils/base.error.js';
import type {
  AuthUser,
  AuthTokens,
  RegisterUserData,
  UserResponse,
} from '@/types/auth.js';

export default class AuthService {
  private generateAndStoreTokens = async (
    userId: number,
  ): Promise<AuthTokens> => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const authPayload: AuthUser = {
      id: user.dataValues.id,
      email: user.dataValues.email,
      role: user.dataValues.role,
    };

    const accessToken = generateAccessToken(authPayload);
    const refreshToken = generateRefreshToken(authPayload);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await RefreshToken.create({
      userId: user.dataValues.id,
      token: await bcrypt.hash(refreshToken, 10),
      expiresAt,
    });

    return { accessToken, refreshToken };
  };

  registerUser = async (
    userData: RegisterUserData,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
  }> => {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = Role.GUEST;
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      active: true,
    });

    const { accessToken, refreshToken } = await this.generateAndStoreTokens(
      user.dataValues.id,
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.dataValues.id,
        name: user.dataValues.name,
        email: user.dataValues.email,
        role: user.dataValues.role,
        active: user.dataValues.active,
      },
    };
  };

  loginUser = async (
    email: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
  }> => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password,
    );
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    const { accessToken, refreshToken } = await this.generateAndStoreTokens(
      user.dataValues.id,
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.dataValues.id,
        name: user.dataValues.name,
        email: user.dataValues.email,
        role: user.dataValues.role,
        active: user.dataValues.active,
      },
    };
  };

  refreshAccessToken = async (
    refreshToken: string,
  ): Promise<{ accessToken: string }> => {
    try {
      const decoded = verifyRefreshToken(refreshToken);

      const user = await User.findByPk(decoded.id);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      const storedToken = await RefreshToken.findOne({
        where: { userId: user.dataValues.id },
      });
      if (!storedToken) {
        throw new AuthenticationError('Refresh token not found');
      }

      const isValid = await bcrypt.compare(
        refreshToken,
        storedToken.dataValues.token,
      );
      if (!isValid) {
        throw new AuthenticationError('Invalid refresh token');
      }

      if (new Date() > storedToken.dataValues.expiresAt) {
        throw new AuthenticationError('Refresh token has expired');
      }

      const authPayload: AuthUser = {
        id: user.dataValues.id,
        email: user.dataValues.email,
        role: user.dataValues.role,
      };

      const newAccessToken = generateAccessToken(authPayload);
      return { accessToken: newAccessToken };
    } catch (error: unknown) {
      if (
        error instanceof AuthenticationError ||
        error instanceof NotFoundError
      ) {
        throw error;
      }
      throw new AuthenticationError('Token refresh failed');
    }
  };

  logoutUser = async (userId: number): Promise<{ message: string }> => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    await RefreshToken.destroy({ where: { userId } });
    return { message: 'User logged out successfully' };
  };

  getUser = async (userId: number): Promise<UserResponse> => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return {
      id: user.dataValues.id,
      name: user.dataValues.name,
      email: user.dataValues.email,
      role: user.dataValues.role,
      active: user.dataValues.active,
    };
  };
}
