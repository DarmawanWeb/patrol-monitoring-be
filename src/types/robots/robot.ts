export interface RobotTypeResponse {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RobotResponse {
  id: string;
  name: string;
  imagePath: string;
  typeId: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateRobotData {
  name: string;
  typeId: number;
  imagePath: string;
  description?: string;
}

export interface CreateRobotWithImageData {
  name: string;
  typeId: number;
  description?: string;
  tempFilePath: string;
  originalName: string;
}

export interface UpdateRobotData {
  name?: string;
  typeId?: number;
  imagePath?: string;
  description?: string;
}

export interface UpdateRobotWithImageData {
  name?: string;
  typeId?: number;
  description?: string;
  newFilePath?: string;
  originalName?: string;
}

export interface RobotServiceResponse {
  message: string;
}
