export interface ICreateComponentType {
  name: string;
  icon: string;
}

export interface IUpdateComponentType {
  name?: string;
  icon?: string;
}

export interface IComponentType {
  id: number;
  name: string;
  icon: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
