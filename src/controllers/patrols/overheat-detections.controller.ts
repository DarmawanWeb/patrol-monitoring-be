import fs from 'node:fs';
import type { Request, Response } from 'express';
import logger from '@/config/logger.js';
import OverheatDetectionService from '@/services/patrols/overheat-detection.service.js';
import { handleError } from '@/utils/error.handler.js';
import createUpload from '@/utils/file.upload.js';

const service = new OverheatDetectionService();
const tempUpload = createUpload('./uploads/temp', [
  'image/jpeg',
  'image/png',
  'image/jpg',
]);

const cleanupTempFiles = (files?: {
  [fieldname: string]: Express.Multer.File[];
}): void => {
  if (!files) return;

  Object.values(files)
    .flat()
    .forEach((file) => {
      if (file.path && fs.existsSync(file.path)) {
        try {
          fs.unlinkSync(file.path);
        } catch (error) {
          logger.error(
            `Failed to delete temporary file: ${file.path}`,
            error as Error,
          );
        }
      }
    });
};

export const createOverheatDetectionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  tempUpload.fields([
    { name: 'thermalImage', maxCount: 1 },
    { name: 'rgbImage', maxCount: 1 },
  ])(req, res, async (err: unknown) => {
    if (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Image upload error';
      res.status(400).json({
        message: errorMessage,
        success: false,
      });
      return;
    }

    try {
      const {
        name,
        sessionId,
        waypointId,
        temperature,
        severityLevel,
        confidenceScore,
        isConfirmed,
        confirmedBy,
        confirmedAt,
        resolutionStatus,
        resolutionNotes,
      } = req.body;

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (
        !name ||
        !sessionId ||
        !waypointId ||
        !temperature ||
        !confidenceScore
      ) {
        res.status(400).json({
          message: 'Missing required fields',
          success: false,
        });
        return;
      }

      const result = await service.createOverheatDetectionWithImages({
        name: name.trim(),
        sessionId: parseInt(sessionId),
        waypointId: parseInt(waypointId),
        temperature: parseFloat(temperature),
        severityLevel,
        confidenceScore: parseFloat(confidenceScore),
        isConfirmed: isConfirmed === 'true',
        confirmedBy: confirmedBy ? parseInt(confirmedBy) : undefined,
        confirmedAt: confirmedAt ? new Date(confirmedAt) : undefined,
        resolutionStatus,
        resolutionNotes: resolutionNotes?.trim(),
        thermalImageFile: files?.thermalImage?.[0],
        rgbImageFile: files?.rgbImage?.[0],
      });

      res.status(201).json({
        message: 'Overheat detection created successfully',
        data: result,
        success: true,
      });
    } catch (error) {
      cleanupTempFiles(
        req.files as { [fieldname: string]: Express.Multer.File[] },
      );
      handleError(error, res);
    }
  });
};

export const getAllOverheatDetectionsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await service.getAllOverheatDetections();
    res.status(200).json({
      message: 'All overheat detections retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getOverheatDetectionByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.getOverheatDetectionById(id);
    res.status(200).json({
      message: 'Overheat detection retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getOverheatDetectionsBySessionIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const sessionId = parseInt(req.params.sessionId || '0');
    const result = await service.getOverheatDetectionsBySessionId(sessionId);
    res.status(200).json({
      message: 'Overheat detections retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getOverheatDetectionsByWaypointIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const waypointId = parseInt(req.params.waypointId || '0');
    const result = await service.getOverheatDetectionsByWaypointId(waypointId);
    res.status(200).json({
      message: 'Overheat detections retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateOverheatDetectionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  tempUpload.fields([
    { name: 'thermalImage', maxCount: 1 },
    { name: 'rgbImage', maxCount: 1 },
  ])(req, res, async (err: unknown) => {
    if (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload error';
      res.status(400).json({
        message: errorMessage,
        success: false,
      });
      return;
    }

    try {
      const id = parseInt(req.params.id || '0');
      const {
        name,
        sessionId,
        waypointId,
        temperature,
        severityLevel,
        confidenceScore,
        isConfirmed,
        confirmedBy,
        confirmedAt,
        resolutionStatus,
        resolutionNotes,
      } = req.body;

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const result = await service.updateOverheatDetectionWithImages(id, {
        name: name?.trim(),
        sessionId: sessionId ? parseInt(sessionId) : undefined,
        waypointId: waypointId ? parseInt(waypointId) : undefined,
        temperature: temperature ? parseFloat(temperature) : undefined,
        severityLevel,
        confidenceScore: confidenceScore
          ? parseFloat(confidenceScore)
          : undefined,
        isConfirmed:
          isConfirmed !== undefined ? isConfirmed === 'true' : undefined,
        confirmedBy: confirmedBy ? parseInt(confirmedBy) : undefined,
        confirmedAt: confirmedAt ? new Date(confirmedAt) : undefined,
        resolutionStatus,
        resolutionNotes: resolutionNotes?.trim(),
        newThermalImageFile: files?.thermalImage?.[0],
        newRgbImageFile: files?.rgbImage?.[0],
      });

      res.status(200).json({
        message: 'Overheat detection updated successfully',
        data: result,
        success: true,
      });
    } catch (error) {
      cleanupTempFiles(
        req.files as { [fieldname: string]: Express.Multer.File[] },
      );
      handleError(error, res);
    }
  });
};

export const deleteOverheatDetectionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    await service.deleteOverheatDetection(id);
    res.status(200).json({
      message: `Overheat detection with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
