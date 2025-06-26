import Robot from '@/database/models/robots/Robot.js';
import { NotFoundError } from '@/utils/base.error.js';

class RobotService {
  async createRobot(data: {
    name: string;
    typeId: number;
    imagePath: string;
    description?: string;
  }) {
    const robot = await Robot.create(data);
    return robot.toJSON();
  }

  async getAllRobots() {
    const robots = await Robot.findAll();
    return robots.map((robot) => robot.toJSON());
  }

  async getRobotById(id: string) {
    const robot = await Robot.findByPk(id);
    if (!robot) throw new NotFoundError('Robot not found');
    return robot.toJSON();
  }

  async updateRobot(
    id: string,
    data: {
      name?: string;
      typeId?: number;
      imagePath?: string;
      description?: string;
    },
  ) {
    const robot = await Robot.findByPk(id);
    if (!robot) throw new NotFoundError('Robot not found');
    await robot.update(data);
    return robot.toJSON();
  }

  async deleteRobot(id: string) {
    const robot = await Robot.findByPk(id);
    if (!robot) throw new NotFoundError('Robot not found');
    await robot.destroy();
    return { message: 'Robot deleted successfully' };
  }
}

export default RobotService;
