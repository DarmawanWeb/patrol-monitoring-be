import type { Request, Response } from 'express';
import PatrolRouteService from '@/services/patrols/patrol-route.service.js';
import { handleError } from '@/utils/error.handler.js';

const service = new PatrolRouteService();

export const createPatrolRouteController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await service.createPatrolRoute(req.body);
    res.status(201).json({
      message: 'Patrol route created successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getAllPatrolRoutesController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await service.getAllPatrolRoutes();
    res.status(200).json({
      message: 'All patrol routes retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getPatrolRouteByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.getPatrolRouteById(id);
    res.status(200).json({
      message: 'Patrol route retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updatePatrolRouteController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.updatePatrolRoute(id, req.body);
    res.status(200).json({
      message: `Patrol route with id ${id} updated successfully`,
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deletePatrolRouteController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    await service.deletePatrolRoute(id);
    res.status(200).json({
      message: `Patrol route with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
