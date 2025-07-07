import type { PatrolStatus } from '@/enums/patrol.enum.js';

export interface PatrolSessionCreateData {
  scheduleId: number;
  startTime: string;
  endTime?: string;
  totalDistance?: number;
  componentsInspected?: number;
  anomaliesDetected?: number;
  batteryStart?: number;
  batteryEnd?: number;
  status?: PatrolStatus;
}

export interface PatrolSessionUpdateData {
  scheduleId?: number;
  startTime?: string;
  endTime?: string;
  totalDistance?: number;
  componentsInspected?: number;
  anomaliesDetected?: number;
  batteryStart?: number;
  batteryEnd?: number;
  status?: PatrolStatus;
}

export interface PatrolSessionResponse {
  id: number;
  scheduleId: number;
  startTime: string;
  endTime: string;
  totalDistance: number;
  componentsInspected: number;
  anomaliesDetected: number;
  batteryStart: number;
  batteryEnd: number;
  status: PatrolStatus;
  createdAt: Date | null;
  updatedAt: Date | null;
}
