import {
  Component,
  ComponentType,
} from '@/database/models/components/index.js';
import type {
  IComponent,
  ICreateComponent,
  IUpdateComponent,
} from '@/types/components/component.js';
import { NotFoundError } from '@/utils/base.error.js';

class ComponentService {
  async createComponent(data: ICreateComponent): Promise<IComponent> {
    const component = await Component.create(data);
    return component.toJSON() as IComponent;
  }

  async getComponentById(id: number): Promise<IComponent> {
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
    return component.toJSON() as IComponent;
  }

  async getAllComponents(): Promise<IComponent[]> {
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
    return components.map((component) => component.toJSON() as IComponent);
  }

  async updateComponent(
    id: number,
    data: IUpdateComponent,
  ): Promise<IComponent> {
    const component = await Component.findByPk(id);
    if (!component) {
      throw new NotFoundError('Component not found');
    }

    const updateData: Partial<IUpdateComponent> = {};
    if (data.name) updateData.name = data.name.trim();
    if (data.typeId) updateData.typeId = data.typeId;
    if (data.model) updateData.model = data.model.trim();
    if (data.manufacturer) updateData.manufacturer = data.manufacturer.trim();
    if (data.warning_temp_threshold !== undefined)
      updateData.warning_temp_threshold = data.warning_temp_threshold;
    if (data.overheat_temp_threshold !== undefined)
      updateData.overheat_temp_threshold = data.overheat_temp_threshold;

    await component.update(updateData);
    return component.toJSON() as IComponent;
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
