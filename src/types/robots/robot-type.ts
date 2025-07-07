export interface IRobotType {
  id: number;
  name: string;
  robotCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RobotTypeInput {
  name: string;
}
