import type { Transaction } from 'sequelize';
import sequelize from '@/config/database.js';
import { PatrolRoute, RouteWaypoint } from '@/database/models/patrols/index.js';
import type {
  RouteWaypointBulkCreateData,
  RouteWaypointCreateData,
  RouteWaypointResponse,
  RouteWaypointUpdateData,
} from '@/types/patrols/route-waypoint.js';
import { NotFoundError } from '@/utils/base.error.js';

class RouteWaypointService {
  async createRouteWaypoint(
    data: RouteWaypointCreateData,
  ): Promise<RouteWaypointResponse> {
    const routeWaypoint = await RouteWaypoint.create(data);
    return routeWaypoint.toJSON() as RouteWaypointResponse;
  }

  // New method for bulk waypoint creation
  async createMultipleRouteWaypoints(
    data: RouteWaypointBulkCreateData,
  ): Promise<RouteWaypointResponse[]> {
    return await sequelize.transaction(async (transaction: Transaction) => {
      // Verify route exists
      const route = await PatrolRoute.findByPk(data.routeId, { transaction });
      if (!route) {
        throw new NotFoundError('Route not found');
      }

      const waypointsData = data.waypoints.map((waypoint) => ({
        ...waypoint,
        routeId: data.routeId,
      }));

      const createdWaypoints = await RouteWaypoint.bulkCreate(waypointsData, {
        transaction,
        returning: true,
      });

      return createdWaypoints.map(
        (waypoint) => waypoint.toJSON() as RouteWaypointResponse,
      );
    });
  }

  async createMultipleRouteWaypointsIndividually(
    data: RouteWaypointBulkCreateData,
  ): Promise<RouteWaypointResponse[]> {
    return await sequelize.transaction(async (transaction: Transaction) => {
      const route = await PatrolRoute.findByPk(data.routeId, { transaction });
      if (!route) {
        throw new NotFoundError('Route not found');
      }

      const createdWaypoints: RouteWaypointResponse[] = [];

      for (const waypointData of data.waypoints) {
        const waypoint = await RouteWaypoint.create(
          {
            ...waypointData,
            routeId: data.routeId,
          },
          { transaction },
        );
        createdWaypoints.push(waypoint.toJSON() as RouteWaypointResponse);
      }

      return createdWaypoints;
    });
  }

  async getRouteWaypointById(id: number): Promise<RouteWaypointResponse> {
    const routeWaypoint = await RouteWaypoint.findByPk(id, {
      include: [
        {
          model: PatrolRoute,
          as: 'route',
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!routeWaypoint) {
      throw new NotFoundError('Route waypoint not found');
    }
    return routeWaypoint.toJSON() as RouteWaypointResponse;
  }

  async getAllRouteWaypoints(): Promise<RouteWaypointResponse[]> {
    const routeWaypoints = await RouteWaypoint.findAll({
      include: [
        {
          model: PatrolRoute,
          as: 'route',
          attributes: ['id', 'name'],
        },
      ],
      order: [
        ['routeId', 'ASC'],
        ['sequenceOrder', 'ASC'],
      ],
    });
    return routeWaypoints.map(
      (waypoint) => waypoint.toJSON() as RouteWaypointResponse,
    );
  }

  async getRouteWaypointsByRouteId(
    routeId: number,
  ): Promise<RouteWaypointResponse[]> {
    const routeWaypoints = await RouteWaypoint.findAll({
      where: { routeId },
      include: [
        {
          model: PatrolRoute,
          as: 'route',
          attributes: ['id', 'name'],
        },
      ],
      order: [['sequenceOrder', 'ASC']],
    });
    return routeWaypoints.map(
      (waypoint) => waypoint.toJSON() as RouteWaypointResponse,
    );
  }

  async updateRouteWaypoint(
    id: number,
    data: RouteWaypointUpdateData,
  ): Promise<RouteWaypointResponse> {
    const routeWaypoint = await RouteWaypoint.findByPk(id);
    if (!routeWaypoint) {
      throw new NotFoundError('Route waypoint not found');
    }

    const updateData: Partial<RouteWaypointUpdateData> = {};
    if (data.routeId) updateData.routeId = data.routeId;
    if (data.sequenceOrder !== undefined)
      updateData.sequenceOrder = data.sequenceOrder;
    if (data.locationX !== undefined) updateData.locationX = data.locationX;
    if (data.locationY !== undefined) updateData.locationY = data.locationY;
    if (data.orientationZ !== undefined)
      updateData.orientationZ = data.orientationZ;
    if (data.waypointType) updateData.waypointType = data.waypointType.trim();
    if (data.cameraPan !== undefined) updateData.cameraPan = data.cameraPan;
    if (data.cameraTilt !== undefined) updateData.cameraTilt = data.cameraTilt;
    if (data.rgbCameraZoom !== undefined)
      updateData.rgbCameraZoom = data.rgbCameraZoom;
    if (data.thermalCameraZoom !== undefined)
      updateData.thermalCameraZoom = data.thermalCameraZoom;

    await routeWaypoint.update(updateData);
    return routeWaypoint.toJSON() as RouteWaypointResponse;
  }

  async deleteRouteWaypoint(id: number): Promise<void> {
    const routeWaypoint = await RouteWaypoint.findByPk(id);
    if (!routeWaypoint) {
      throw new NotFoundError('Route waypoint not found');
    }

    await routeWaypoint.destroy();
  }

  async deleteRouteWaypointsByRouteId(routeId: number): Promise<void> {
    await RouteWaypoint.destroy({
      where: { routeId },
    });
  }
}

export default RouteWaypointService;
