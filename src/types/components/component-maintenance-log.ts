export interface ICreateComponentMaintenanceLog {
  componentSerialNumber: string;
  description?: string;
  performedAt: Date;
  performedBy: string;
}

export interface IUpdateComponentMaintenanceLog {
  description?: string;
  performedAt?: Date;
  performedBy?: string;
}

export interface IComponentMaintenanceLog {
  componentSerialNumber: string;
  description: string | null;
  performedAt: Date;
  performedBy: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
