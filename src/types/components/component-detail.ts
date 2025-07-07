import type { ComponentStatus } from '@/enums/component.enum.js';

export interface ComponentDetailCreateData {
  serialNumber: string;
  name: string;
  componentId: number;
  installedAt: Date;
  locationX: number;
  locationY: number;
  locationZ: number;
  status?: ComponentStatus;
}

export interface ComponentDetailUpdateData {
  name?: string;
  componentId?: number;
  installedAt?: Date;
  locationX?: number;
  locationY?: number;
  locationZ?: number;
  status?: ComponentStatus;
}

export interface ComponentDetailResponse {
  serialNumber: string;
  name: string;
  componentId: number;
  installedAt: Date;
  locationX: number;
  locationY: number;
  locationZ: number;
  status: ComponentStatus;
  createdAt: Date | null;
  updatedAt: Date | null;
}
