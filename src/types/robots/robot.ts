export interface IRobotType {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRobot {
  id: string;
  name: string;
  imagePath: string;
  typeId: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateRobotInput {
  name: string;
  typeId: number;
  imagePath: string;
  description?: string;
}

export interface CreateRobotWithImageInput {
  name: string;
  typeId: number;
  description?: string;
  tempFilePath: string;
  originalName: string;
}

export interface UpdateRobotInput {
  name?: string;
  typeId?: number;
  imagePath?: string;
  description?: string;
}

export interface UpdateRobotWithImageInput {
  name?: string;
  typeId?: number;
  description?: string;
  newFilePath?: string;
  originalName?: string;
}

export interface RobotServiceResponse {
  message: string;
}
