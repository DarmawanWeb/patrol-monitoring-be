// src/services/components/component-type.service.ts

import { ComponentType } from '@/database/models/components/index.js';
import type {
  IComponentType,
  ICreateComponentType,
  IUpdateComponentType,
} from '@/types/components/component-type.js';
import { NotFoundError } from '@/utils/base.error.js';

class ComponentTypeService {
  async createComponentType(
    data: ICreateComponentType,
  ): Promise<IComponentType> {
    const componentType = await ComponentType.create(data);
    return componentType.toJSON() as IComponentType;
  }

  async getComponentTypeById(id: number): Promise<IComponentType> {
    const componentType = await ComponentType.findByPk(id);
    if (!componentType) {
      throw new NotFoundError('Component type not found');
    }
    return componentType.toJSON() as IComponentType;
  }

  async getAllComponentTypes(): Promise<IComponentType[]> {
    const componentTypes = await ComponentType.findAll({
      order: [['createdAt', 'DESC']],
    });
    return componentTypes.map((type) => type.toJSON() as IComponentType);
  }

  async updateComponentType(
    id: number,
    data: IUpdateComponentType,
  ): Promise<IComponentType> {
    const componentType = await ComponentType.findByPk(id);
    if (!componentType) {
      throw new NotFoundError('Component type not found');
    }

    const updateData: Partial<IUpdateComponentType> = {};
    if (data.name) updateData.name = data.name.trim();
    if (data.icon) updateData.icon = data.icon.trim();

    await componentType.update(updateData);
    return componentType.toJSON() as IComponentType;
  }

  async deleteComponentType(id: number): Promise<void> {
    const componentType = await ComponentType.findByPk(id);
    if (!componentType) {
      throw new NotFoundError('Component type not found');
    }

    await componentType.destroy();
  }
}

export default ComponentTypeService;
