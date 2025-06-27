import fs from 'fs';
import logger from '@/config/logger.js';
import type { Request, Response } from 'express';
import createUpload from '@/utils/file.upload.js';
import { handleError } from '@/utils/error.handler.js';
import RobotService from '@/services/robots/robot.service.js';

const robotService = new RobotService();
const tempUpload = createUpload('./uploads/temp', [
  'image/jpeg',
  'image/png',
  'image/jpg',
]);

const cleanupTempFile = (filePath?: string): void => {
  if (filePath && fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      logger.error(
        `Failed to delete temporary file: ${filePath}`,
        error as Error,
      );
    }
  }
};

export const createRobotController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  tempUpload.single('image')(req, res, async (err: unknown) => {
    if (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Image upload error';
      res.status(400).json({
        message: errorMessage,
        success: false,
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        message: 'Image file is required',
        success: false,
      });
      return;
    }

    try {
      const { name, typeId, description } = req.body;
      const result = await robotService.createRobotWithImage({
        name: name.trim(),
        typeId: typeId,
        description: description?.trim(),
        tempFilePath: req.file.path,
        originalName: req.file.originalname,
      });

      res.status(201).json({
        message: 'Robot created successfully',
        data: result,
        success: true,
      });
    } catch (error) {
      cleanupTempFile(req.file?.path);
      handleError(error, res);
    }
  });
};

export const getAllRobotsController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
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

export const getRobotByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = String(req.params.id || '');
    const robot = await robotService.getRobotById(id);
    res.status(200).json({
      message: 'Robot retrieved successfully',
      data: robot,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateRobotController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  tempUpload.single('image')(req, res, async (err: unknown) => {
    if (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload error';
      res.status(400).json({
        message: errorMessage,
        success: false,
      });
      return;
    }

    try {
      const id = String(req.params.id || '');
      const { name, typeId, description } = req.body;

      const result = await robotService.updateRobotWithImage(id, {
        name: name?.trim(),
        typeId: typeId,
        description: description?.trim(),
        newFilePath: req.file?.path,
        originalName: req.file?.originalname,
      });

      res.status(200).json({
        message: 'Robot updated successfully',
        data: result,
        success: true,
      });
    } catch (error) {
      cleanupTempFile(req.file?.path);
      handleError(error, res);
    }
  });
};

export const deleteRobotController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = String(req.params.id || '');
    await robotService.deleteRobot(id);
    res.status(200).json({
      message: `Robot with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
