import type { Request, Response } from 'express';
import RobotMaintenanceLogService from '@/services/robots/robot-maintenance-log.service.js';
import { handleError } from '@/utils/error.handler.js';

const service = new RobotMaintenanceLogService();

export const createMaintenanceLogsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await service.createLog(req.body);
    res.status(201).json({
      message: 'Maintenance log created successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllMaintenanceLogsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { page, limit } = req.query;
    const result = await service.getAllLogs({
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 50,
    });
    res.status(200).json({
      message: 'Maintenance logs retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getMaintenanceLogsByRobotIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = String(req.params.id || '');
    const result = await service.getLogsByRobotId(id);
    res.status(200).json({
      message: 'Maintenance logs for this robot retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getMaintenanceLogByIdController = async (
  req: Request,
  res: Response,
) => {
  const id = String(req.params.id || '');

  try {
    const result = await service.getLogById(parseInt(id));
    res.status(200).json({
      message: 'Maintenance log retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateMaintenanceLogController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = String(req.params.id || '');
    const result = await service.updateLog(parseInt(id), req.body);
    res.status(200).json({
      message: 'Maintenance log updated successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteMaintenanceLogController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    await service.deleteLog(parseInt(req.params.id));
    res.status(200).json({
      message: 'Maintenance log deleted successfully',
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
