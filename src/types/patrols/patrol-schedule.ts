import type { ScheduleType } from '@/enums/schedule.enum.js';

export interface PatrolScheduleCreateData {
  robotId: string;
  routeId: number;
  scheduleType: ScheduleType;
  startTime: string;
  intervalMinutes?: number;
  daysOfWeek?: number[];
  daysOfMonth?: number[];
}

export interface PatrolScheduleUpdateData {
  robotId?: string;
  routeId?: number;
  scheduleType?: ScheduleType;
  startTime?: string;
  intervalMinutes?: number;
  daysOfWeek?: number[];
  daysOfMonth?: number[];
}

export interface PatrolScheduleResponse {
  id: number;
  robotId: string;
  routeId: number;
  scheduleType: ScheduleType;
  startTime: string;
  intervalMinutes: number | null;
  daysOfWeek: number[] | null;
  daysOfMonth: number[] | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
