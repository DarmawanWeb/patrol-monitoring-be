import {
  PatrolSchedule,
  PatrolSession,
} from '@/database/models/patrols/index.js';
import { PatrolStatus } from '@/enums/patrol.enum.js';
import type {
  PatrolSessionCreateData,
  PatrolSessionResponse,
  PatrolSessionUpdateData,
} from '@/types/patrols/patrol-session.js';
import { NotFoundError } from '@/utils/base.error.js';

class PatrolSessionService {
  async createPatrolSession(
    data: PatrolSessionCreateData,
  ): Promise<PatrolSessionResponse> {
    const createData = {
      ...data,
      endTime: data.endTime || '',
      totalDistance: data.totalDistance || 0,
      componentsInspected: data.componentsInspected || 0,
      anomaliesDetected: data.anomaliesDetected || 0,
      batteryStart: data.batteryStart || 100,
      batteryEnd: data.batteryEnd || 100,
      status: data.status || PatrolStatus.SCHEDULED,
    };
    const patrolSession = await PatrolSession.create(createData);
    return patrolSession.toJSON() as PatrolSessionResponse;
  }

  async getPatrolSessionById(id: number): Promise<PatrolSessionResponse> {
    const patrolSession = await PatrolSession.findByPk(id, {
      include: [
        {
          model: PatrolSchedule,
          as: 'schedule',
          attributes: ['id', 'robotId', 'routeId', 'scheduleType', 'startTime'],
        },
      ],
    });
    if (!patrolSession) {
      throw new NotFoundError('Patrol session not found');
    }
    return patrolSession.toJSON() as PatrolSessionResponse;
  }

  async getAllPatrolSessions(): Promise<PatrolSessionResponse[]> {
    const patrolSessions = await PatrolSession.findAll({
      include: [
        {
          model: PatrolSchedule,
          as: 'schedule',
          attributes: ['id', 'robotId', 'routeId', 'scheduleType', 'startTime'],
        },
      ],
      order: [['startTime', 'DESC']],
    });
    return patrolSessions.map(
      (session) => session.toJSON() as PatrolSessionResponse,
    );
  }

  async getPatrolSessionsByScheduleId(
    scheduleId: number,
  ): Promise<PatrolSessionResponse[]> {
    const patrolSessions = await PatrolSession.findAll({
      where: { scheduleId },
      include: [
        {
          model: PatrolSchedule,
          as: 'schedule',
          attributes: ['id', 'robotId', 'routeId', 'scheduleType', 'startTime'],
        },
      ],
      order: [['startTime', 'DESC']],
    });
    return patrolSessions.map(
      (session) => session.toJSON() as PatrolSessionResponse,
    );
  }

  async updatePatrolSession(
    id: number,
    data: PatrolSessionUpdateData,
  ): Promise<PatrolSessionResponse> {
    const patrolSession = await PatrolSession.findByPk(id);
    if (!patrolSession) {
      throw new NotFoundError('Patrol session not found');
    }

    const updateData: Partial<PatrolSessionUpdateData> = {};
    if (data.scheduleId) updateData.scheduleId = data.scheduleId;
    if (data.startTime) updateData.startTime = data.startTime;
    if (data.endTime) updateData.endTime = data.endTime;
    if (data.totalDistance !== undefined)
      updateData.totalDistance = data.totalDistance;
    if (data.componentsInspected !== undefined)
      updateData.componentsInspected = data.componentsInspected;
    if (data.anomaliesDetected !== undefined)
      updateData.anomaliesDetected = data.anomaliesDetected;
    if (data.batteryStart !== undefined)
      updateData.batteryStart = data.batteryStart;
    if (data.batteryEnd !== undefined) updateData.batteryEnd = data.batteryEnd;
    if (data.status) updateData.status = data.status;

    await patrolSession.update(updateData);
    return patrolSession.toJSON() as PatrolSessionResponse;
  }

  async deletePatrolSession(id: number): Promise<void> {
    const patrolSession = await PatrolSession.findByPk(id);
    if (!patrolSession) {
      throw new NotFoundError('Patrol session not found');
    }

    await patrolSession.destroy();
  }
}

export default PatrolSessionService;
