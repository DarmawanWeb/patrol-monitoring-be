import type { Request, Response } from 'express';
import RouteWaypointService from '@/services/patrols/route-waypoint.service.js';
import type {
  RouteWaypointBulkCreateData,
  RouteWaypointCreateData,
  RouteWaypointUpdateData,
} from '@/types/patrols/route-waypoint.js';
import { handleError } from '@/utils/error.handler.js';

const routeWaypointService = new RouteWaypointService();

export const createRouteWaypointController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const waypointData: RouteWaypointCreateData = req.body;
    const waypoint =
      await routeWaypointService.createRouteWaypoint(waypointData);

    res.status(201).json({
      success: true,
      message: 'Route waypoint created successfully',
      data: waypoint,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const createMultipleRouteWaypointsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const bulkData: RouteWaypointBulkCreateData = req.body;
    const waypoints =
      await routeWaypointService.createMultipleRouteWaypoints(bulkData);

    res.status(201).json({
      success: true,
      message: `${waypoints.length} route waypoints created successfully`,
      data: waypoints,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getRouteWaypointByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const waypoint = await routeWaypointService.getRouteWaypointById(
      Number(id),
    );

    res.status(200).json({
      success: true,
      data: waypoint,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllRouteWaypointsController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const waypoints = await routeWaypointService.getAllRouteWaypoints();

    res.status(200).json({
      success: true,
      data: waypoints,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getRouteWaypointsByRouteIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { routeId } = req.params;
    const waypoints = await routeWaypointService.getRouteWaypointsByRouteId(
      Number(routeId),
    );

    res.status(200).json({
      success: true,
      data: waypoints,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateRouteWaypointController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData: RouteWaypointUpdateData = req.body;
    const waypoint = await routeWaypointService.updateRouteWaypoint(
      Number(id),
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'Route waypoint updated successfully',
      data: waypoint,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteRouteWaypointController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    await routeWaypointService.deleteRouteWaypoint(Number(id));

    res.status(200).json({
      success: true,
      message: 'Route waypoint deleted successfully',
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteRouteWaypointsByRouteIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { routeId } = req.params;
    await routeWaypointService.deleteRouteWaypointsByRouteId(Number(routeId));

    res.status(200).json({
      success: true,
      message: 'All route waypoints deleted successfully',
    });
  } catch (error) {
    handleError(error, res);
  }
};
