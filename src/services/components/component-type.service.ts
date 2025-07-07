import { ComponentType } from '@/database/models/components/index.js';
import type {
  ComponentTypeCreateData,
  ComponentTypeResponse,
  ComponentTypeUpdateData,
} from '@/types/components/component-type.js';
import { NotFoundError } from '@/utils/base.error.js';

class ComponentTypeService {
  async createComponentType(
    data: ComponentTypeCreateData,
  ): Promise<ComponentTypeResponse> {
    const componentType = await ComponentType.create(data);
    return componentType.toJSON() as ComponentTypeResponse;
  }

  async getComponentTypeById(id: number): Promise<ComponentTypeResponse> {
    const componentType = await ComponentType.findByPk(id);
    if (!componentType) {
      throw new NotFoundError('Component type not found');
    }
    return componentType.toJSON() as ComponentTypeResponse;
  }

  async getAllComponentTypes(): Promise<ComponentTypeResponse[]> {
    const componentTypes = await ComponentType.findAll({
      order: [['createdAt', 'DESC']],
    });
    return componentTypes.map((type) => type.toJSON() as ComponentTypeResponse);
  }

  async updateComponentType(
    id: number,
    data: ComponentTypeUpdateData,
  ): Promise<ComponentTypeResponse> {
    const componentType = await ComponentType.findByPk(id);
    if (!componentType) {
      throw new NotFoundError('Component type not found');
    }

    const updateData: Partial<ComponentTypeUpdateData> = {};
    if (data.name) updateData.name = data.name.trim();
    if (data.icon) updateData.icon = data.icon.trim();

    await componentType.update(updateData);
    return componentType.toJSON() as ComponentTypeResponse;
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
