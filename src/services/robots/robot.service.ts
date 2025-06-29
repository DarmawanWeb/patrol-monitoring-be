import fs from 'fs';
import path from 'path';
import {
  Robot,
  RobotType,
  RobotWebsocket,
} from '@/database/models/robots/index.js';

import { PaginatedResult } from '@/types/general.js';

import { NotFoundError, ValidationError } from '@/utils/base.error.js';
import {
  CreateRobotInput,
  CreateRobotWithImageInput,
  UpdateRobotInput,
  UpdateRobotWithImageInput,
  IRobot,
} from '@/types/robot.js';

class RobotService {
  async createRobot(data: CreateRobotInput): Promise<IRobot> {
    const robot = await Robot.create(data);
    return robot.toJSON() as IRobot;
  }

  async createRobotWithImage(data: CreateRobotWithImageInput): Promise<IRobot> {
    if (!data.tempFilePath || !fs.existsSync(data.tempFilePath)) {
      throw new ValidationError('Temporary file not found');
    }
    let tempFolderPath: string | null = null;

    try {
      const robot = await Robot.create({
        name: data.name,
        typeId: data.typeId,
        description: data.description,
        imagePath: 'placeholder',
      });

      const folderPath = `./uploads/robots/${robot.id}`;
      tempFolderPath = folderPath;

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      const ext = path.extname(data.originalName);
      const finalPath = path.join(folderPath, `image${ext}`);

      fs.renameSync(data.tempFilePath, finalPath);
      await robot.update({ imagePath: finalPath });

      return robot.toJSON() as IRobot;
    } catch (error) {
      if (fs.existsSync(data.tempFilePath)) {
        try {
          fs.unlinkSync(data.tempFilePath);
        } catch (cleanupError) {
          console.error('Error cleaning up temp file:', cleanupError);
        }
      }

      if (tempFolderPath && fs.existsSync(tempFolderPath)) {
        try {
          fs.rmSync(tempFolderPath, { recursive: true, force: true });
        } catch (cleanupError) {
          console.error('Error cleaning up temp folder:', cleanupError);
        }
      }

      throw error;
    }
  }

  async getAllRobots(options: {
    page: number;
    limit: number;
  }): Promise<PaginatedResult<Robot>> {
    const { page = 1, limit = 50 } = options;
    const offset = (page - 1) * limit;

    const { count, rows } = await Robot.findAndCountAll({
      include: [
        {
          model: RobotType,
          as: 'type',
          attributes: ['id', 'name'],
        },
        {
          model: RobotWebsocket,
          as: 'websockets',
          attributes: [
            'batteryLevel',
            'locationX',
            'locationY',
            'status',
            'timeStamp',
          ],
          limit: 1,
          order: [['timeStamp', 'DESC']],
        },
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      distinct: true,
    });

    const totalPages = Math.ceil(count / limit);

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages,
      },
    };
  }

  async getRobotById(id: string): Promise<IRobot> {
    const robot = await Robot.findByPk(id, {
      include: [
        {
          model: RobotType,
          as: 'type',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!robot) {
      throw new NotFoundError('Robot not found');
    }
    return robot.toJSON() as IRobot;
  }

  async updateRobotWithImage(
    id: string,
    data: UpdateRobotWithImageInput,
  ): Promise<IRobot> {
    const robot = await Robot.findByPk(id);
    const updateData: UpdateRobotInput = {
      name: data.name,
      typeId: data.typeId,
      description: data.description,
    };

    try {
      if (data.newFilePath && data.originalName) {
        if (!fs.existsSync(data.newFilePath)) {
          throw new ValidationError('New image file not found');
        }

        if (robot?.imagePath && fs.existsSync(robot.imagePath)) {
          fs.unlinkSync(robot.imagePath);
        }

        const folderPath = `./uploads/robots/${robot?.id}`;
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }

        const ext = path.extname(data.originalName);
        const finalPath = path.join(folderPath, `image${ext}`);
        fs.renameSync(data.newFilePath, finalPath);
        updateData.imagePath = finalPath;
      }
      await robot?.update(updateData);
      return robot?.toJSON() as IRobot;
    } catch (error) {
      if (data.newFilePath && fs.existsSync(data.newFilePath)) {
        fs.unlinkSync(data.newFilePath);
      }
      throw error;
    }
  }

  async deleteRobot(id: string): Promise<void> {
    const robot = await Robot.findByPk(id);
    try {
      if (robot?.imagePath && fs.existsSync(robot.imagePath)) {
        fs.unlinkSync(robot.imagePath);

        const folderPath = path.dirname(robot.imagePath);
        fs.rmdirSync(folderPath);
      }
      await robot?.destroy();
    } catch (error) {
      console.error('Error deleting robot:', error);
      throw error;
    }
  }
}

export default RobotService;
