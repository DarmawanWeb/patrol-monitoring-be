import type { Request, Response } from 'express';
import AuthService from '@/services/users/auth.service.js';
import type { AuthRequest } from '@/types/users/auth.js';
import { handleError } from '@/utils/error.handler.js';

const authService = new AuthService();

export const registerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(200).json({
      message: 'User registered successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const registerWithRoleController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(200).json({
      message: 'User registered successfully with role',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json({
      message: 'User logged in successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const refreshController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { accessToken } = await authService.refreshAccessToken(req.body);
    res.status(200).json({
      message: 'Access token refreshed successfully',
      data: { accessToken },
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const logoutController = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(String(req.user?.id || '0'));
    const result = await authService.logoutUser(userId);
    res.status(200).json({
      message: 'User logged out successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const userController = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(String(req.user?.id || '0'));
    const userData = await authService.getUser(userId);
    res.status(200).json({
      message: 'User retrieved successfully',
      data: userData,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};
