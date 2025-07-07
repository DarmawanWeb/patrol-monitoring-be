import { PatrolRoute, RouteWaypoint } from '@/database/models/patrols/index.js';
import type {
  PatrolRouteCreateData,
  PatrolRouteResponse,
  PatrolRouteUpdateData,
} from '@/types/patrols/patrol-route.js';
import { NotFoundError } from '@/utils/base.error.js';

class PatrolRouteService {
  async createPatrolRoute(
    data: PatrolRouteCreateData,
  ): Promise<PatrolRouteResponse> {
    const createData = {
      ...data,
      total_distance: data.total_distance || 0,
      estimated_duration: data.estimated_duration || 0,
    };
    const patrolRoute = await PatrolRoute.create(createData);
    return patrolRoute.toJSON() as PatrolRouteResponse;
  }

  async getPatrolRouteById(id: number): Promise<PatrolRouteResponse> {
    const patrolRoute = await PatrolRoute.findByPk(id, {
      include: [
        {
          model: RouteWaypoint,
          as: 'waypoints',
          attributes: [
            'id',
            'sequenceOrder',
            'locationX',
            'locationY',
            'waypointType',
          ],
        },
      ],
    });
    if (!patrolRoute) {
      throw new NotFoundError('Patrol route not found');
    }
    return patrolRoute.toJSON() as PatrolRouteResponse;
  }

  async getAllPatrolRoutes(): Promise<PatrolRouteResponse[]> {
    const patrolRoutes = await PatrolRoute.findAll({
      include: [
        {
          model: RouteWaypoint,
          as: 'waypoints',
          attributes: [
            'id',
            'sequenceOrder',
            'locationX',
            'locationY',
            'waypointType',
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return patrolRoutes.map((route) => route.toJSON() as PatrolRouteResponse);
  }

  async updatePatrolRoute(
    id: number,
    data: PatrolRouteUpdateData,
  ): Promise<PatrolRouteResponse> {
    const patrolRoute = await PatrolRoute.findByPk(id);
    if (!patrolRoute) {
      throw new NotFoundError('Patrol route not found');
    }

    const updateData: Partial<PatrolRouteUpdateData> = {};
    if (data.name) updateData.name = data.name.trim();
    if (data.description !== undefined)
      updateData.description = data.description?.trim();
    if (data.total_distance !== undefined)
      updateData.total_distance = data.total_distance;
    if (data.estimated_duration !== undefined)
      updateData.estimated_duration = data.estimated_duration;

    await patrolRoute.update(updateData);
    return patrolRoute.toJSON() as PatrolRouteResponse;
  }

  async deletePatrolRoute(id: number): Promise<void> {
    const patrolRoute = await PatrolRoute.findByPk(id);
    if (!patrolRoute) {
      throw new NotFoundError('Patrol route not found');
    }

    await patrolRoute.destroy();
  }
}

export default PatrolRouteService;
