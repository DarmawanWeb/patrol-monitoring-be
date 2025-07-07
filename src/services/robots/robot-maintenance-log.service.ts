import { RobotMaintenanceLog } from '@/database/models/robots/index.js';
import type {
  RobotMaintenanceLogCreateData,
  RobotMaintenanceLogResponse,
  RobotMaintenanceLogUpdateData,
} from '@/types/robots/robot-maintenance-log.js';
import { NotFoundError } from '@/utils/base.error.js';

class RobotMaintenanceLogService {
  async createLog(
    data: RobotMaintenanceLogCreateData,
  ): Promise<RobotMaintenanceLogResponse> {
    const log = await RobotMaintenanceLog.create(data);
    return log.toJSON();
  }

  async getAllLogs(
    options: { page?: number; limit?: number } = {},
  ): Promise<RobotMaintenanceLogResponse[]> {
    const { page = 1, limit = 50 } = options;
    const offset = (page - 1) * limit;
    const logs = await RobotMaintenanceLog.findAll({
      offset,
      limit,
      order: [['performedAt', 'DESC']],
    });
    if (!logs.length) {
      throw new NotFoundError('No maintenance logs found');
    }
    return logs.map((log) => log.toJSON()) as RobotMaintenanceLogResponse[];
  }

  async getLogsByRobotId(
    robotId: string,
  ): Promise<RobotMaintenanceLogResponse[]> {
    const logs = await RobotMaintenanceLog.findAll({
      where: { robotId },
      order: [['performedAt', 'DESC']],
    });

    if (!logs.length) {
      throw new NotFoundError('No maintenance logs found for this robot');
    }
    return logs.map((log) => log.toJSON()) as RobotMaintenanceLogResponse[];
  }

  async getLogById(id: number): Promise<RobotMaintenanceLogResponse> {
    const log = await RobotMaintenanceLog.findByPk(id);

    if (!log) {
      throw new NotFoundError('Maintenance log not found');
    }
    return log.toJSON();
  }

  async updateLog(
    id: number,
    data: RobotMaintenanceLogUpdateData,
  ): Promise<RobotMaintenanceLogResponse> {
    const log = await RobotMaintenanceLog.findByPk(id);
    if (!log) {
      throw new NotFoundError('Maintenance log not found');
    }

    await log.update(data);
    return log.toJSON();
  }

  async deleteLog(id: number) {
    const log = await RobotMaintenanceLog.findByPk(id);
    if (!log) {
      throw new NotFoundError('Maintenance log not found');
    }

    await log.destroy();
  }
}

export default RobotMaintenanceLogService;
