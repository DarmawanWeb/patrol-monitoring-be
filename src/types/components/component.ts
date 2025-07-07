export interface ICreateComponent {
  name: string;
  typeId: number;
  model: string;
  manufacturer: string;
  warning_temp_threshold: number;
  overheat_temp_threshold: number;
}

export interface IUpdateComponent {
  name?: string;
  typeId?: number;
  model?: string;
  manufacturer?: string;
  warning_temp_threshold?: number;
  overheat_temp_threshold?: number;
}

export interface IComponent {
  id: number;
  name: string;
  typeId: number;
  model: string;
  manufacturer: string;
  warning_temp_threshold: number;
  overheat_temp_threshold: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}
