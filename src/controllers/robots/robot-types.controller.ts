import type { Request, Response } from 'express';
import { handleError } from '@/utils/error.handler.js';
import RobotTypeService from '@/services/robots/robot-type.service.js';

const service = new RobotTypeService();

export const createRobotTypeController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await service.createRobotType(req.body);
    res.status(201).json({
      message: 'Robot type created successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getAllRobotTypesController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await service.getAllRobotTypes();
    res.status(200).json({
      message: 'All robot type retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getRobotTypeByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.getRobotTypeById(id);
    res.status(200).json({
      message: 'Robot type retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateRobotTypeController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.updateRobotType(id, req.body);
    res.status(200).json({
      message: `Robot type with id ${id} pdated successfully`,
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteRobotTypeController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    await service.deleteRobotType(id);
    res.status(200).json({
      message: `Robot type with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
