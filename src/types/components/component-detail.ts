import type { ComponentStatus } from '@/enums/component.enum.js';

export interface ICreateComponentDetail {
  serialNumber: string;
  name: string;
  componentId: number;
  installedAt: Date;
  locationX: number;
  locationY: number;
  locationZ: number;
  status?: ComponentStatus;
}

export interface IUpdateComponentDetail {
  name?: string;
  componentId?: number;
  installedAt?: Date;
  locationX?: number;
  locationY?: number;
  locationZ?: number;
  status?: ComponentStatus;
}

export interface IComponentDetail {
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
