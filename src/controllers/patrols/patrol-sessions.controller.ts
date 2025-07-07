import type { Request, Response } from 'express';
import PatrolSessionService from '@/services/patrols/patrol-session.service.js';
import { handleError } from '@/utils/error.handler.js';

const service = new PatrolSessionService();

export const createPatrolSessionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await service.createPatrolSession(req.body);
    res.status(201).json({
      message: 'Patrol session created successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getAllPatrolSessionsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await service.getAllPatrolSessions();
    res.status(200).json({
      message: 'All patrol sessions retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getPatrolSessionByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.getPatrolSessionById(id);
    res.status(200).json({
      message: 'Patrol session retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getPatrolSessionsByScheduleIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const scheduleId = parseInt(req.params.scheduleId || '0');
    const result = await service.getPatrolSessionsByScheduleId(scheduleId);
    res.status(200).json({
      message: 'Patrol sessions retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updatePatrolSessionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.updatePatrolSession(id, req.body);
    res.status(200).json({
      message: `Patrol session with id ${id} updated successfully`,
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deletePatrolSessionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    await service.deletePatrolSession(id);
    res.status(200).json({
      message: `Patrol session with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
