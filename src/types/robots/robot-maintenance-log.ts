export interface IRobotMaintenanceLog {
  robotId: string;
  description?: string;
  performedAt: Date;
  performedBy: string;
}

export interface IRobotMaintenanceLogCreate {
  robotId: string;
  description?: string;
  performedAt: Date;
  performedBy: string;
}

export interface IRobotMaintenanceLogUpdate {
  description?: string;
  performedAt?: Date;
  performedBy?: string;
}
