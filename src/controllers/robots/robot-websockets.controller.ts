import type { Request, Response } from 'express';
import { handleError } from '@/utils/error.handler.js';
import RobotWebsocketService from '@/services/robots/robot-websocket.service.js';
import { parseRoutesQuery } from '@/utils/query-parser.js';

const robotWebsocketService = new RobotWebsocketService();

export async function getAllRobotRoutesController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { limit, startDate, endDate } = parseRoutesQuery(req.query);
    const routes = await robotWebsocketService.getAllRobotRoutes(
      limit,
      startDate,
      endDate,
    );
    res.status(200).json({
      success: true,
      message: 'All robot routes retrieved successfully',
      data: routes,
    });
  } catch (err) {
    handleError(err, res);
  }
}

export async function getRobotRouteByIdController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const id = String(req.params.id || '');
    const { limit, startDate, endDate } = parseRoutesQuery(req.query);
    const route = await robotWebsocketService.getRobotRouteById(
      id,
      limit,
      startDate,
      endDate,
    );
    res.status(200).json({
      success: true,
      message: 'Robot route retrieved successfully',
      data: route,
    });
  } catch (err) {
    handleError(err, res);
  }
}
