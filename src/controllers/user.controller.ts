import type { Request, Response } from 'express';
import { handleError } from '@/utils/error.handler.js';
import UserService from '@/services/user.service.js';

const userService = new UserService();

export const getAllUsersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      message: 'Users retrieved successfully',
      data: users,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id || '0', 10);
    const updatedUser = await userService.updateUserData(id, req.body);
    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id || '0', 10);
    await userService.deleteUser(id);
    res.status(200).json({
      message: `User with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
