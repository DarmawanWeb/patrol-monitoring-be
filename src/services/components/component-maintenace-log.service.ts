import {
  ComponentDetail,
  ComponentMaintenanceLog,
} from '@/database/models/components/index.js';
import type {
  ComponentMaintenanceLogCreateData,
  ComponentMaintenanceLogResponse,
  ComponentMaintenanceLogUpdateData,
} from '@/types/components/component-maintenance-log.js';
import { NotFoundError } from '@/utils/base.error.js';

class ComponentMaintenanceLogService {
  async createComponentMaintenanceLog(
    data: ComponentMaintenanceLogCreateData,
  ): Promise<ComponentMaintenanceLogResponse> {
    const maintenanceLog = await ComponentMaintenanceLog.create(data);
    return maintenanceLog.toJSON() as ComponentMaintenanceLogResponse;
  }

  async getComponentMaintenanceLogById(
    id: number,
  ): Promise<ComponentMaintenanceLogResponse> {
    const maintenanceLog = await ComponentMaintenanceLog.findByPk(id, {
      include: [
        {
          model: ComponentDetail,
          as: 'componentDetail',
          attributes: ['serialNumber', 'name'],
        },
      ],
    });
    if (!maintenanceLog) {
      throw new NotFoundError('Component maintenance log not found');
    }
    return maintenanceLog.toJSON() as ComponentMaintenanceLogResponse;
  }

  async getAllComponentMaintenanceLogs(): Promise<
    ComponentMaintenanceLogResponse[]
  > {
    const maintenanceLogs = await ComponentMaintenanceLog.findAll({
      include: [
        {
          model: ComponentDetail,
          as: 'componentDetail',
          attributes: ['serialNumber', 'name'],
        },
      ],
      order: [['performedAt', 'DESC']],
    });
    return maintenanceLogs.map(
      (log) => log.toJSON() as ComponentMaintenanceLogResponse,
    );
  }

  async getComponentMaintenanceLogsBySerialNumber(
    componentSerialNumber: string,
  ): Promise<ComponentMaintenanceLogResponse[]> {
    const maintenanceLogs = await ComponentMaintenanceLog.findAll({
      where: { componentSerialNumber },
      include: [
        {
          model: ComponentDetail,
          as: 'componentDetail',
          attributes: ['serialNumber', 'name'],
        },
      ],
      order: [['performedAt', 'DESC']],
    });
    return maintenanceLogs.map(
      (log) => log.toJSON() as ComponentMaintenanceLogResponse,
    );
  }

  async updateComponentMaintenanceLog(
    id: number,
    data: ComponentMaintenanceLogUpdateData,
  ): Promise<ComponentMaintenanceLogResponse> {
    const maintenanceLog = await ComponentMaintenanceLog.findByPk(id);
    if (!maintenanceLog) {
      throw new NotFoundError('Component maintenance log not found');
    }

    const updateData: Partial<ComponentMaintenanceLogUpdateData> = {};
    if (data.description !== undefined)
      updateData.description = data.description?.trim();
    if (data.performedAt) updateData.performedAt = data.performedAt;
    if (data.performedBy) updateData.performedBy = data.performedBy.trim();

    await maintenanceLog.update(updateData);
    return maintenanceLog.toJSON() as ComponentMaintenanceLogResponse;
  }

  async deleteComponentMaintenanceLog(id: number): Promise<void> {
    const maintenanceLog = await ComponentMaintenanceLog.findByPk(id);
    if (!maintenanceLog) {
      throw new NotFoundError('Component maintenance log not found');
    }

    await maintenanceLog.destroy();
  }
}

export default ComponentMaintenanceLogService;
