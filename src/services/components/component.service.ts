import {
  Component,
  ComponentType,
} from '@/database/models/components/index.js';
import type {
  ComponentCreateData,
  ComponentResponse,
  ComponentUpdateData,
} from '@/types/components/component.js';
import { NotFoundError } from '@/utils/base.error.js';

class ComponentService {
  async createComponent(data: ComponentCreateData): Promise<ComponentResponse> {
    const component = await Component.create(data);
    return component.toJSON() as ComponentResponse;
  }

  async getComponentById(id: number): Promise<ComponentResponse> {
    const component = await Component.findByPk(id, {
      include: [
        {
          model: ComponentType,
          as: 'type',
          attributes: ['id', 'name', 'icon'],
        },
      ],
    });
    if (!component) {
      throw new NotFoundError('Component not found');
    }
    return component.toJSON() as ComponentResponse;
  }

  async getAllComponents(): Promise<ComponentResponse[]> {
    const components = await Component.findAll({
      include: [
        {
          model: ComponentType,
          as: 'type',
          attributes: ['id', 'name', 'icon'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return components.map(
      (component) => component.toJSON() as ComponentResponse,
    );
  }

  async updateComponent(
    id: number,
    data: ComponentUpdateData,
  ): Promise<ComponentResponse> {
    const component = await Component.findByPk(id);
    if (!component) {
      throw new NotFoundError('Component not found');
    }

    const updateData: Partial<ComponentUpdateData> = {};
    if (data.name) updateData.name = data.name.trim();
    if (data.typeId) updateData.typeId = data.typeId;
    if (data.model) updateData.model = data.model.trim();
    if (data.manufacturer) updateData.manufacturer = data.manufacturer.trim();
    if (data.warning_temp_threshold !== undefined)
      updateData.warning_temp_threshold = data.warning_temp_threshold;
    if (data.overheat_temp_threshold !== undefined)
      updateData.overheat_temp_threshold = data.overheat_temp_threshold;

    await component.update(updateData);
    return component.toJSON() as ComponentResponse;
  }

  async deleteComponent(id: number): Promise<void> {
    const component = await Component.findByPk(id);
    if (!component) {
      throw new NotFoundError('Component not found');
    }

    await component.destroy();
  }
}

export default ComponentService;
