import fs from 'node:fs';
import path from 'node:path';
import {
  OverheatDetection,
  PatrolSession,
  RouteWaypoint,
} from '@/database/models/patrols/index.js';
import { ResolutionStatus, SeverityLevel } from '@/enums/result.enum.js';
import type {
  OverheatDetectionCreateData,
  OverheatDetectionCreateWithImageData,
  OverheatDetectionResponse,
  OverheatDetectionUpdateData,
  OverheatDetectionUpdateWithImageData,
} from '@/types/patrols/overheat-detection.js';
import { NotFoundError } from '@/utils/base.error.js';

class OverheatDetectionService {
  async createOverheatDetection(
    data: OverheatDetectionCreateData,
  ): Promise<OverheatDetectionResponse> {
    const createData = {
      ...data,
      severityLevel: data.severityLevel || SeverityLevel.LOW,
      isConfirmed: data.isConfirmed || false,
      resolutionStatus: data.resolutionStatus || ResolutionStatus.UNRESOLVED,
      resolutionNotes: data.resolutionNotes || '',
    };
    const overheatDetection = await OverheatDetection.create(createData);
    return overheatDetection.toJSON() as OverheatDetectionResponse;
  }

  async createOverheatDetectionWithImages(
    data: OverheatDetectionCreateWithImageData,
  ): Promise<OverheatDetectionResponse> {
    let tempFolderPath: string | null = null;

    try {
      const overheatDetection = await OverheatDetection.create({
        name: data.name,
        sessionId: data.sessionId,
        waypointId: data.waypointId,
        temperature: data.temperature,
        severityLevel: data.severityLevel || SeverityLevel.LOW,
        confidenceScore: data.confidenceScore,
        isConfirmed: data.isConfirmed || false,
        confirmedBy: data.confirmedBy,
        confirmedAt: data.confirmedAt,
        resolutionStatus: data.resolutionStatus || ResolutionStatus.UNRESOLVED,
        resolutionNotes: data.resolutionNotes || '',
        thermalImagePath: '',
        rgbImagePath: '',
      });

      const folderPath = `./uploads/overheat-detections/${overheatDetection.id}`;
      tempFolderPath = folderPath;

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      let thermalImagePath = '';
      let rgbImagePath = '';

      // Handle thermal image
      if (data.thermalImageFile && fs.existsSync(data.thermalImageFile.path)) {
        const thermalExt = path.extname(data.thermalImageFile.originalname);
        const thermalFinalPath = path.join(folderPath, `thermal${thermalExt}`);
        fs.renameSync(data.thermalImageFile.path, thermalFinalPath);
        thermalImagePath = thermalFinalPath;
      }

      // Handle RGB image
      if (data.rgbImageFile && fs.existsSync(data.rgbImageFile.path)) {
        const rgbExt = path.extname(data.rgbImageFile.originalname);
        const rgbFinalPath = path.join(folderPath, `rgb${rgbExt}`);
        fs.renameSync(data.rgbImageFile.path, rgbFinalPath);
        rgbImagePath = rgbFinalPath;
      }

      await overheatDetection.update({
        thermalImagePath: thermalImagePath || '',
        rgbImagePath: rgbImagePath || '',
      });

      return overheatDetection.toJSON() as OverheatDetectionResponse;
    } catch (error) {
      // Cleanup temporary files
      if (
        data.thermalImageFile?.path &&
        fs.existsSync(data.thermalImageFile.path)
      ) {
        try {
          fs.unlinkSync(data.thermalImageFile.path);
        } catch (cleanupError) {}
      }
      if (data.rgbImageFile?.path && fs.existsSync(data.rgbImageFile.path)) {
        try {
          fs.unlinkSync(data.rgbImageFile.path);
        } catch (cleanupError) {}
      }

      // Cleanup created folder
      if (tempFolderPath && fs.existsSync(tempFolderPath)) {
        try {
          fs.rmSync(tempFolderPath, { recursive: true, force: true });
        } catch (cleanupError) {}
      }

      throw error;
    }
  }

  async getOverheatDetectionById(
    id: number,
  ): Promise<OverheatDetectionResponse> {
    const overheatDetection = await OverheatDetection.findByPk(id, {
      include: [
        {
          model: PatrolSession,
          as: 'session',
          attributes: ['id', 'scheduleId', 'startTime', 'status'],
        },
        {
          model: RouteWaypoint,
          as: 'waypoint',
          attributes: [
            'id',
            'routeId',
            'sequenceOrder',
            'locationX',
            'locationY',
          ],
        },
      ],
    });
    if (!overheatDetection) {
      throw new NotFoundError('Overheat detection not found');
    }
    return overheatDetection.toJSON() as OverheatDetectionResponse;
  }

  async getAllOverheatDetections(): Promise<OverheatDetectionResponse[]> {
    const overheatDetections = await OverheatDetection.findAll({
      include: [
        {
          model: PatrolSession,
          as: 'session',
          attributes: ['id', 'scheduleId', 'startTime', 'status'],
        },
        {
          model: RouteWaypoint,
          as: 'waypoint',
          attributes: [
            'id',
            'routeId',
            'sequenceOrder',
            'locationX',
            'locationY',
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return overheatDetections.map(
      (detection) => detection.toJSON() as OverheatDetectionResponse,
    );
  }

  async getOverheatDetectionsBySessionId(
    sessionId: number,
  ): Promise<OverheatDetectionResponse[]> {
    const overheatDetections = await OverheatDetection.findAll({
      where: { sessionId },
      include: [
        {
          model: PatrolSession,
          as: 'session',
          attributes: ['id', 'scheduleId', 'startTime', 'status'],
        },
        {
          model: RouteWaypoint,
          as: 'waypoint',
          attributes: [
            'id',
            'routeId',
            'sequenceOrder',
            'locationX',
            'locationY',
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return overheatDetections.map(
      (detection) => detection.toJSON() as OverheatDetectionResponse,
    );
  }

  async getOverheatDetectionsByWaypointId(
    waypointId: number,
  ): Promise<OverheatDetectionResponse[]> {
    const overheatDetections = await OverheatDetection.findAll({
      where: { waypointId },
      include: [
        {
          model: PatrolSession,
          as: 'session',
          attributes: ['id', 'scheduleId', 'startTime', 'status'],
        },
        {
          model: RouteWaypoint,
          as: 'waypoint',
          attributes: [
            'id',
            'routeId',
            'sequenceOrder',
            'locationX',
            'locationY',
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return overheatDetections.map(
      (detection) => detection.toJSON() as OverheatDetectionResponse,
    );
  }

  async updateOverheatDetectionWithImages(
    id: number,
    data: OverheatDetectionUpdateWithImageData,
  ): Promise<OverheatDetectionResponse> {
    const overheatDetection = await OverheatDetection.findByPk(id);
    if (!overheatDetection) {
      throw new NotFoundError('Overheat detection not found');
    }

    const updateData: Partial<OverheatDetectionUpdateData> = {};
    if (data.name) updateData.name = data.name.trim();
    if (data.sessionId) updateData.sessionId = data.sessionId;
    if (data.waypointId) updateData.waypointId = data.waypointId;
    if (data.temperature !== undefined)
      updateData.temperature = data.temperature;
    if (data.severityLevel) updateData.severityLevel = data.severityLevel;
    if (data.confidenceScore !== undefined)
      updateData.confidenceScore = data.confidenceScore;
    if (data.isConfirmed !== undefined)
      updateData.isConfirmed = data.isConfirmed;
    if (data.confirmedBy !== undefined)
      updateData.confirmedBy = data.confirmedBy;
    if (data.confirmedAt !== undefined)
      updateData.confirmedAt = data.confirmedAt;
    if (data.resolutionStatus)
      updateData.resolutionStatus = data.resolutionStatus;
    if (data.resolutionNotes !== undefined)
      updateData.resolutionNotes = data.resolutionNotes?.trim();

    try {
      // Handle image updates
      const folderPath = `./uploads/overheat-detections/${overheatDetection.id}`;

      if (data.newThermalImageFile || data.newRgbImageFile) {
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }
      }

      // Handle thermal image update
      if (
        data.newThermalImageFile &&
        fs.existsSync(data.newThermalImageFile.path)
      ) {
        // Delete old thermal image
        if (
          overheatDetection.thermalImagePath &&
          fs.existsSync(overheatDetection.thermalImagePath)
        ) {
          fs.unlinkSync(overheatDetection.thermalImagePath);
        }

        const thermalExt = path.extname(data.newThermalImageFile.originalname);
        const thermalFinalPath = path.join(folderPath, `thermal${thermalExt}`);
        fs.renameSync(data.newThermalImageFile.path, thermalFinalPath);
        updateData.thermalImagePath = thermalFinalPath;
      }

      // Handle RGB image update
      if (data.newRgbImageFile && fs.existsSync(data.newRgbImageFile.path)) {
        // Delete old RGB image
        if (
          overheatDetection.rgbImagePath &&
          fs.existsSync(overheatDetection.rgbImagePath)
        ) {
          fs.unlinkSync(overheatDetection.rgbImagePath);
        }

        const rgbExt = path.extname(data.newRgbImageFile.originalname);
        const rgbFinalPath = path.join(folderPath, `rgb${rgbExt}`);
        fs.renameSync(data.newRgbImageFile.path, rgbFinalPath);
        updateData.rgbImagePath = rgbFinalPath;
      }

      await overheatDetection.update(updateData);
      return overheatDetection.toJSON() as OverheatDetectionResponse;
    } catch (error) {
      // Cleanup temporary files on error
      if (
        data.newThermalImageFile?.path &&
        fs.existsSync(data.newThermalImageFile.path)
      ) {
        fs.unlinkSync(data.newThermalImageFile.path);
      }
      if (
        data.newRgbImageFile?.path &&
        fs.existsSync(data.newRgbImageFile.path)
      ) {
        fs.unlinkSync(data.newRgbImageFile.path);
      }
      throw error;
    }
  }

  async updateOverheatDetection(
    id: number,
    data: OverheatDetectionUpdateData,
  ): Promise<OverheatDetectionResponse> {
    const overheatDetection = await OverheatDetection.findByPk(id);
    if (!overheatDetection) {
      throw new NotFoundError('Overheat detection not found');
    }

    const updateData: Partial<OverheatDetectionUpdateData> = {};
    if (data.name) updateData.name = data.name.trim();
    if (data.sessionId) updateData.sessionId = data.sessionId;
    if (data.waypointId) updateData.waypointId = data.waypointId;
    if (data.temperature !== undefined)
      updateData.temperature = data.temperature;
    if (data.severityLevel) updateData.severityLevel = data.severityLevel;
    if (data.thermalImagePath)
      updateData.thermalImagePath = data.thermalImagePath;
    if (data.rgbImagePath) updateData.rgbImagePath = data.rgbImagePath;
    if (data.confidenceScore !== undefined)
      updateData.confidenceScore = data.confidenceScore;
    if (data.isConfirmed !== undefined)
      updateData.isConfirmed = data.isConfirmed;
    if (data.confirmedBy !== undefined)
      updateData.confirmedBy = data.confirmedBy;
    if (data.confirmedAt !== undefined)
      updateData.confirmedAt = data.confirmedAt;
    if (data.resolutionStatus)
      updateData.resolutionStatus = data.resolutionStatus;
    if (data.resolutionNotes !== undefined)
      updateData.resolutionNotes = data.resolutionNotes?.trim();

    await overheatDetection.update(updateData);
    return overheatDetection.toJSON() as OverheatDetectionResponse;
  }

  async deleteOverheatDetection(id: number): Promise<void> {
    const overheatDetection = await OverheatDetection.findByPk(id);
    if (!overheatDetection) {
      throw new NotFoundError('Overheat detection not found');
    }

    // Delete associated images
    if (
      overheatDetection.thermalImagePath &&
      fs.existsSync(overheatDetection.thermalImagePath)
    ) {
      fs.unlinkSync(overheatDetection.thermalImagePath);
    }
    if (
      overheatDetection.rgbImagePath &&
      fs.existsSync(overheatDetection.rgbImagePath)
    ) {
      fs.unlinkSync(overheatDetection.rgbImagePath);
    }

    // Delete folder if empty
    const folderPath = `./uploads/overheat-detections/${overheatDetection.id}`;
    if (fs.existsSync(folderPath)) {
      try {
        fs.rmdirSync(folderPath);
      } catch (error) {
        // Folder might not be empty, ignore error
      }
    }

    await overheatDetection.destroy();
  }
}

export default OverheatDetectionService;
