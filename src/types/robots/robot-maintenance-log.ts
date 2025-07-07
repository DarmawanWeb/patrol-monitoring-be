export interface RobotMaintenanceLogResponse {
  robotId: string;
  description?: string;
  performedAt: Date;
  performedBy: string;
}

export interface RobotMaintenanceLogCreateData {
  robotId: string;
  description?: string;
  performedAt: Date;
  performedBy: string;
}

export interface RobotMaintenanceLogUpdateData {
  description?: string;
  performedAt?: Date;
  performedBy?: string;
}
