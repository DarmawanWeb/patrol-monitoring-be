import { col, fn } from 'sequelize';
import { Robot, RobotType } from '@/database/models/robots/index.js';
import type { IRobotType, RobotTypeInput } from '@/types/robots/robot-type.js';
import { NotFoundError, ValidationError } from '@/utils/base.error.js';

class RobotTypeService {
  async createRobotType(data: RobotTypeInput): Promise<IRobotType> {
    const robotType = await RobotType.create({
      name: data.name.trim(),
    });
    return robotType.toJSON() as IRobotType;
  }

  async getRobotTypeById(id: number): Promise<IRobotType> {
    const robotType = await RobotType.findByPk(id, {
      include: [
        {
          model: Robot,
          as: 'robots',
          attributes: ['id', 'name'],
          required: false,
        },
      ],
    });

    if (!robotType) {
      throw new NotFoundError('Robot type not found');
    }
    return robotType.toJSON() as IRobotType;
  }

  async getAllRobotTypes(): Promise<IRobotType[]> {
    const robotTypes: RobotType[] = await RobotType.findAll({
      attributes: {
        include: [[fn('COUNT', col('robots.id')), 'robotCount']],
      },
      include: [
        {
          model: Robot,
          as: 'robots',
          attributes: [],
          required: false,
        },
      ],
      group: ['RobotType.id'],
      order: [['createdAt', 'DESC']],
    });

    return robotTypes.map((type) => {
      const json = type.toJSON() as IRobotType & { robotCount: number };
      json.robotCount = Number(
        (
          type as RobotType & { getDataValue: (key: string) => unknown }
        ).getDataValue('robotCount') ?? 0,
      );
      return json;
    });
  }

  async updateRobotType(id: number, data: RobotTypeInput): Promise<IRobotType> {
    const robotType = await RobotType.findByPk(id);
    if (!robotType) {
      throw new NotFoundError('Robot type not found');
    }

    const updateData: Partial<IRobotType> = {};
    if (data.name) {
      updateData.name = data.name.trim();
    }

    await robotType.update(updateData);
    return robotType.toJSON() as IRobotType;
  }

  async deleteRobotType(id: number): Promise<void> {
    const robotType = await RobotType.findByPk(id);
    if (!robotType) {
      throw new NotFoundError('Robot type not found');
    }

    const robotCount = await Robot.count({
      where: { typeId: id },
    });

    if (robotCount > 0) {
      throw new ValidationError(
        `Cannot delete robot type. ${robotCount} robot(s) are using this type. Please reassign or delete those robots first.`,
      );
    }
    await robotType.destroy();
  }
}

export default RobotTypeService;
