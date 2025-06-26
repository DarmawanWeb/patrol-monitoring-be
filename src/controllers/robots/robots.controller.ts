import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import RobotService from '@/services/robots/robot.service.js';
import { handleError } from '@/utils/error.handler.js';
import createUpload from '@/utils/file.upload.js';

const robotService = new RobotService();
const tempUpload = createUpload('./uploads/temp', ['image/jpeg', 'image/png']);

export const createRobotController = async (req: Request, res: Response) => {
  tempUpload.single('image')(req, res, async (err) => {
    if (err || !req.file) {
      res.status(400).json({
        message: err instanceof Error ? err.message : 'Image upload error',
        success: false,
      });
      return;
    }

    try {
      const { name, typeId, description } = req.body;

      const robot = await robotService.createRobot({
        name,
        typeId: parseInt(typeId),
        imagePath: '', // placeholder
        description,
      });

      const folderPath = `./uploads/robots/${robot.id}`;
      fs.mkdirSync(folderPath, { recursive: true });

      const ext = path.extname(req.file.originalname);
      const finalPath = path.join(folderPath, `image${ext}`);
      fs.renameSync(req.file.path, finalPath);

      const updated = await robotService.updateRobot(robot.id, {
        imagePath: finalPath,
      });

      res.status(201).json({
        message: 'Robot created successfully',
        data: updated,
        success: true,
      });
    } catch (error) {
      fs.unlinkSync(req.file.path);
      handleError(error, res);
    }
  });
};

export const getAllRobotsController = async (_req: Request, res: Response) => {
  try {
    const robots = await robotService.getAllRobots();
    res.status(200).json({
      message: 'Robots retrieved successfully',
      data: robots,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getRobotByIdController = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        message: 'Robot ID is required',
        success: false,
      });
      return;
    }
    const robot = await robotService.getRobotById(req.params.id);
    res.status(200).json({
      message: 'Robot retrieved successfully',
      data: robot,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateRobotController = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        message: 'Robot ID is required',
        success: false,
      });
      return;
    }
    const robot = await robotService.updateRobot(req.params.id, req.body);
    res.status(200).json({
      message: 'Robot updated successfully',
      data: robot,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteRobotController = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        message: 'Robot ID is required',
        success: false,
      });
      return;
    }
    const result = await robotService.deleteRobot(req.params.id);
    res.status(200).json({ ...result, success: true });
  } catch (error) {
    handleError(error, res);
  }
};
