import {
  Component,
  ComponentDetail,
} from '@/database/models/components/index.js';
import type {
  ComponentDetailCreateData,
  ComponentDetailResponse,
  ComponentDetailUpdateData,
} from '@/types/components/component-detail.js';
import { NotFoundError } from '@/utils/base.error.js';

class ComponentDetailService {
  async createComponentDetail(
    data: ComponentDetailCreateData,
  ): Promise<ComponentDetailResponse> {
    const componentDetail = await ComponentDetail.create(data);
    return componentDetail.toJSON() as ComponentDetailResponse;
  }

  async getComponentDetailBySerialNumber(
    serialNumber: string,
  ): Promise<ComponentDetailResponse> {
    const componentDetail = await ComponentDetail.findByPk(serialNumber, {
      include: [
        {
          model: Component,
          as: 'component',
          attributes: ['id', 'name', 'model', 'manufacturer'],
        },
      ],
    });
    if (!componentDetail) {
      throw new NotFoundError('Component detail not found');
    }
    return componentDetail.toJSON() as ComponentDetailResponse;
  }

  async getAllComponentDetails(): Promise<ComponentDetailResponse[]> {
    const componentDetails = await ComponentDetail.findAll({
      include: [
        {
          model: Component,
          as: 'component',
          attributes: ['id', 'name', 'model', 'manufacturer'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return componentDetails.map(
      (detail) => detail.toJSON() as ComponentDetailResponse,
    );
  }

  async getComponentDetailsByComponentId(
    componentId: number,
  ): Promise<ComponentDetailResponse[]> {
    const componentDetails = await ComponentDetail.findAll({
      where: { componentId },
      include: [
        {
          model: Component,
          as: 'component',
          attributes: ['id', 'name', 'model', 'manufacturer'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return componentDetails.map(
      (detail) => detail.toJSON() as ComponentDetailResponse,
    );
  }

  async updateComponentDetail(
    serialNumber: string,
    data: ComponentDetailUpdateData,
  ): Promise<ComponentDetailResponse> {
    const componentDetail = await ComponentDetail.findByPk(serialNumber);
    if (!componentDetail) {
      throw new NotFoundError('Component detail not found');
    }

    const updateData: Partial<ComponentDetailUpdateData> = {};
    if (data.name) updateData.name = data.name.trim();
    if (data.componentId) updateData.componentId = data.componentId;
    if (data.installedAt) updateData.installedAt = data.installedAt;
    if (data.locationX !== undefined) updateData.locationX = data.locationX;
    if (data.locationY !== undefined) updateData.locationY = data.locationY;
    if (data.locationZ !== undefined) updateData.locationZ = data.locationZ;
    if (data.status) updateData.status = data.status;

    await componentDetail.update(updateData);
    return componentDetail.toJSON() as ComponentDetailResponse;
  }

  async deleteComponentDetail(serialNumber: string): Promise<void> {
    const componentDetail = await ComponentDetail.findByPk(serialNumber);
    if (!componentDetail) {
      throw new NotFoundError('Component detail not found');
    }

    await componentDetail.destroy();
  }
}

export default ComponentDetailService;
