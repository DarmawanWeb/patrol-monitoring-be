export interface ComponentMaintenanceLogCreateData {
  componentSerialNumber: string;
  description?: string;
  performedAt: Date;
  performedBy: string;
}

export interface ComponentMaintenanceLogUpdateData {
  description?: string;
  performedAt?: Date;
  performedBy?: string;
}

export interface ComponentMaintenanceLogResponse {
  componentSerialNumber: string;
  description: string | null;
  performedAt: Date;
  performedBy: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
