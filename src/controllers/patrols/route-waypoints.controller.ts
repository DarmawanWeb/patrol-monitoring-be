import type { Request, Response } from 'express';
import RouteWaypointService from '@/services/patrols/route-waypoint.service.js';
import { handleError } from '@/utils/error.handler.js';

const service = new RouteWaypointService();

export const createRouteWaypointController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await service.createRouteWaypoint(req.body);
    res.status(201).json({
      message: 'Route waypoint created successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getAllRouteWaypointsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await service.getAllRouteWaypoints();
    res.status(200).json({
      message: 'All route waypoints retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getRouteWaypointByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.getRouteWaypointById(id);
    res.status(200).json({
      message: 'Route waypoint retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getRouteWaypointsByRouteIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const routeId = parseInt(req.params.routeId || '0');
    const result = await service.getRouteWaypointsByRouteId(routeId);
    res.status(200).json({
      message: 'Route waypoints retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateRouteWaypointController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.updateRouteWaypoint(id, req.body);
    res.status(200).json({
      message: `Route waypoint with id ${id} updated successfully`,
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteRouteWaypointController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    await service.deleteRouteWaypoint(id);
    res.status(200).json({
      message: `Route waypoint with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
