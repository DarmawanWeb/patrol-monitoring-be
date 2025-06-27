export interface IRobotType {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RobotTypeInput {
  name: string;
}
