import RobotType from '@/database/models/robots/RobotType.js';
import { NotFoundError } from '@/utils/base.error.js';

class RobotTypeService {
  createRobotType = async (data: { name: string }) => {
    const robotType = await RobotType.create(data);
    return robotType.toJSON();
  };

  getRobotTypeById = async (id: number) => {
    const robotType = await RobotType.findByPk(id);
    if (!robotType) throw new NotFoundError('Robot type not found');
    return robotType.toJSON();
  };

  getAllRobotTypes = async () => {
    const robotTypes = await RobotType.findAll();
    return robotTypes.map((type) => type.toJSON());
  };

  updateRobotType = async (id: number, data: { name?: string }) => {
    const robotType = await RobotType.findByPk(id);
    if (!robotType) throw new NotFoundError('Robot type not found');
    await robotType.update(data);
    return robotType.toJSON();
  };

  deleteRobotType = async (id: number) => {
    const robotType = await RobotType.findByPk(id);
    if (!robotType) throw new NotFoundError('Robot type not found');
    await robotType.destroy();
    return { message: 'Robot type deleted successfully' };
  };
}

export default RobotTypeService;
