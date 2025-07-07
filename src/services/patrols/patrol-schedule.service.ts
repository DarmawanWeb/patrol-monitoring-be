import {
  PatrolRoute,
  PatrolSchedule,
} from '@/database/models/patrols/index.js';
import { Robot } from '@/database/models/robots/index.js';
import type {
  PatrolScheduleCreateData,
  PatrolScheduleResponse,
  PatrolScheduleUpdateData,
} from '@/types/patrols/patrol-schedule.js';
import { NotFoundError } from '@/utils/base.error.js';

class PatrolScheduleService {
  async createPatrolSchedule(
    data: PatrolScheduleCreateData,
  ): Promise<PatrolScheduleResponse> {
    const patrolSchedule = await PatrolSchedule.create(data);
    return patrolSchedule.toJSON() as PatrolScheduleResponse;
  }

  async getPatrolScheduleById(id: number): Promise<PatrolScheduleResponse> {
    const patrolSchedule = await PatrolSchedule.findByPk(id, {
      include: [
        {
          model: Robot,
          as: 'robot',
          attributes: ['id', 'name'],
        },
        {
          model: PatrolRoute,
          as: 'route',
          attributes: ['id', 'name', 'total_distance', 'estimated_duration'],
        },
      ],
    });
    if (!patrolSchedule) {
      throw new NotFoundError('Patrol schedule not found');
    }
    return patrolSchedule.toJSON() as PatrolScheduleResponse;
  }

  async getAllPatrolSchedules(): Promise<PatrolScheduleResponse[]> {
    const patrolSchedules = await PatrolSchedule.findAll({
      include: [
        {
          model: Robot,
          as: 'robot',
          attributes: ['id', 'name'],
        },
        {
          model: PatrolRoute,
          as: 'route',
          attributes: ['id', 'name', 'total_distance', 'estimated_duration'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return patrolSchedules.map(
      (schedule) => schedule.toJSON() as PatrolScheduleResponse,
    );
  }

  async getPatrolSchedulesByRobotId(
    robotId: string,
  ): Promise<PatrolScheduleResponse[]> {
    const patrolSchedules = await PatrolSchedule.findAll({
      where: { robotId },
      include: [
        {
          model: Robot,
          as: 'robot',
          attributes: ['id', 'name'],
        },
        {
          model: PatrolRoute,
          as: 'route',
          attributes: ['id', 'name', 'total_distance', 'estimated_duration'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return patrolSchedules.map(
      (schedule) => schedule.toJSON() as PatrolScheduleResponse,
    );
  }

  async updatePatrolSchedule(
    id: number,
    data: PatrolScheduleUpdateData,
  ): Promise<PatrolScheduleResponse> {
    const patrolSchedule = await PatrolSchedule.findByPk(id);
    if (!patrolSchedule) {
      throw new NotFoundError('Patrol schedule not found');
    }

    const updateData: Partial<PatrolScheduleUpdateData> = {};
    if (data.robotId) updateData.robotId = data.robotId;
    if (data.routeId) updateData.routeId = data.routeId;
    if (data.scheduleType) updateData.scheduleType = data.scheduleType;
    if (data.startTime) updateData.startTime = data.startTime;
    if (data.intervalMinutes !== undefined)
      updateData.intervalMinutes = data.intervalMinutes;
    if (data.daysOfWeek !== undefined) updateData.daysOfWeek = data.daysOfWeek;
    if (data.daysOfMonth !== undefined)
      updateData.daysOfMonth = data.daysOfMonth;

    await patrolSchedule.update(updateData);
    return patrolSchedule.toJSON() as PatrolScheduleResponse;
  }

  async deletePatrolSchedule(id: number): Promise<void> {
    const patrolSchedule = await PatrolSchedule.findByPk(id);
    if (!patrolSchedule) {
      throw new NotFoundError('Patrol schedule not found');
    }

    await patrolSchedule.destroy();
  }
}

export default PatrolScheduleService;
