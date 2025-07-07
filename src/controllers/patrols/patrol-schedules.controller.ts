import type { Request, Response } from 'express';
import PatrolScheduleService from '@/services/patrols/patrol-schedule.service.js';
import { handleError } from '@/utils/error.handler.js';

const service = new PatrolScheduleService();

export const createPatrolScheduleController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await service.createPatrolSchedule(req.body);
    res.status(201).json({
      message: 'Patrol schedule created successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getAllPatrolSchedulesController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await service.getAllPatrolSchedules();
    res.status(200).json({
      message: 'All patrol schedules retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getPatrolScheduleByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.getPatrolScheduleById(id);
    res.status(200).json({
      message: 'Patrol schedule retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getPatrolSchedulesByRobotIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const robotId = String(req.params.robotId || '');
    const result = await service.getPatrolSchedulesByRobotId(robotId);
    res.status(200).json({
      message: 'Patrol schedules retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updatePatrolScheduleController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.updatePatrolSchedule(id, req.body);
    res.status(200).json({
      message: `Patrol schedule with id ${id} updated successfully`,
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deletePatrolScheduleController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    await service.deletePatrolSchedule(id);
    res.status(200).json({
      message: `Patrol schedule with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
