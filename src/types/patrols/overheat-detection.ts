// src/types/patrols/overheat-detection.ts

import type { ResolutionStatus, SeverityLevel } from '@/enums/result.enum.js';

export interface OverheatDetectionCreateData {
  name: string;
  sessionId: number;
  waypointId: number;
  temperature: number;
  severityLevel?: SeverityLevel;
  thermalImagePath?: string;
  rgbImagePath?: string;
  confidenceScore: number;
  isConfirmed?: boolean;
  confirmedBy?: number;
  confirmedAt?: Date;
  resolutionStatus?: ResolutionStatus;
  resolutionNotes?: string;
}

export interface OverheatDetectionCreateWithImageData {
  name: string;
  sessionId: number;
  waypointId: number;
  temperature: number;
  severityLevel?: SeverityLevel;
  confidenceScore: number;
  isConfirmed?: boolean;
  confirmedBy?: number;
  confirmedAt?: Date;
  resolutionStatus?: ResolutionStatus;
  resolutionNotes?: string;
  thermalImageFile?: Express.Multer.File;
  rgbImageFile?: Express.Multer.File;
}

export interface OverheatDetectionUpdateData {
  name?: string;
  sessionId?: number;
  waypointId?: number;
  temperature?: number;
  severityLevel?: SeverityLevel;
  thermalImagePath?: string;
  rgbImagePath?: string;
  confidenceScore?: number;
  isConfirmed?: boolean;
  confirmedBy?: number;
  confirmedAt?: Date;
  resolutionStatus?: ResolutionStatus;
  resolutionNotes?: string;
}

export interface OverheatDetectionUpdateWithImageData {
  name?: string;
  sessionId?: number;
  waypointId?: number;
  temperature?: number;
  severityLevel?: SeverityLevel;
  confidenceScore?: number;
  isConfirmed?: boolean;
  confirmedBy?: number;
  confirmedAt?: Date;
  resolutionStatus?: ResolutionStatus;
  resolutionNotes?: string;
  newThermalImageFile?: Express.Multer.File;
  newRgbImageFile?: Express.Multer.File;
}

export interface OverheatDetectionResponse {
  id: number;
  name: string;
  sessionId: number;
  waypointId: number;
  temperature: number;
  severityLevel: SeverityLevel;
  thermalImagePath: string;
  rgbImagePath: string;
  confidenceScore: number;
  isConfirmed: boolean;
  confirmedBy: number | null;
  confirmedAt: Date | null;
  resolutionStatus: ResolutionStatus;
  resolutionNotes: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
