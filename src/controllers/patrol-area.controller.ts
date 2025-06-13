import { Request, Response } from 'express';
import { handleError } from '@/utils/error.handler.js';
import createUpload from '@/utils/file.upload.js';
import PatrolAreaService from '@/services/patrol-area.service.js';
import { CreatePatrolAreaData } from '@/types/patrol-area.js';

const patrolAreaService = new PatrolAreaService();

const patrolAreaImagePath = './uploads/patrol_areas';
const upload = createUpload(patrolAreaImagePath, ['image/jpeg', 'image/png']);

export const createPatrolAreaController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    upload.single('image')(req, res, async (error: unknown) => {
      try {
        if (error) {
          res.status(400).json({
            message:
              error instanceof Error ? error.message : 'File upload error',
            success: false,
          });
          return;
        }

        if (!req.file) {
          res.status(400).json({
            message: 'No image uploaded',
            success: false,
          });
          return;
        }
        const patrolAreaData: CreatePatrolAreaData = {
          name: req.body.name,
          image: req.file.path,
          mapCenterLat: parseFloat(req.body.mapCenterLat),
          mapCenterLng: parseFloat(req.body.mapCenterLng),
          description: req.body.description,
          address: req.body.address,
          cargingDockLat: req.body.cargingDockLat
            ? parseFloat(req.body.cargingDockLat)
            : undefined,
          cargingDockLng: req.body.cargingDockLng
            ? parseFloat(req.body.cargingDockLng)
            : undefined,
          cargingDockYaw: req.body.cargingDockYaw
            ? parseFloat(req.body.cargingDockYaw)
            : undefined,
        };

        const result = await patrolAreaService.createPatrolArea(patrolAreaData);

        res.status(201).json({
          message: 'Patrol Area created successfully',
          data: result,
          success: true,
        });
      } catch (err) {
        handleError(err, res);
      }
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updatePatrolAreaController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id || '0');
    if (isNaN(id)) {
      res.status(400).json({
        message: 'Invalid ID parameter',
        success: false,
      });
      return;
    }

    const updateData = { ...req.body };
    if (updateData.mapCenterLat)
      updateData.mapCenterLat = parseFloat(updateData.mapCenterLat);
    if (updateData.mapCenterLng)
      updateData.mapCenterLng = parseFloat(updateData.mapCenterLng);
    if (updateData.cargingDockLat)
      updateData.cargingDockLat = parseFloat(updateData.cargingDockLat);
    if (updateData.cargingDockLng)
      updateData.cargingDockLng = parseFloat(updateData.cargingDockLng);
    if (updateData.cargingDockYaw)
      updateData.cargingDockYaw = parseFloat(updateData.cargingDockYaw);

    const result = await patrolAreaService.updatePatrolArea(id, updateData);

    res.status(200).json({
      message: 'Patrol Area updated successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deletePatrolAreaController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id || '0');
    if (isNaN(id)) {
      res.status(400).json({
        message: 'Invalid ID parameter',
        success: false,
      });
      return;
    }

    const result = await patrolAreaService.deletePatrolArea(id);

    res.status(200).json({
      message: result.message,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getPatrolAreaByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id || '0');
    if (isNaN(id)) {
      res.status(400).json({
        message: 'Invalid ID parameter',
        success: false,
      });
      return;
    }

    const result = await patrolAreaService.getPatrolAreaById(id);

    res.status(200).json({
      message: 'Patrol Area retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllPatrolAreasController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const patrolAreas = await patrolAreaService.getAllPatrolAreas();

    res.status(200).json({
      message: 'Patrol Areas retrieved successfully',
      data: patrolAreas,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
