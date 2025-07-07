export interface ComponentCreateData {
  name: string;
  typeId: number;
  model: string;
  manufacturer: string;
  warning_temp_threshold: number;
  overheat_temp_threshold: number;
}

export interface ComponentUpdateData {
  name?: string;
  typeId?: number;
  model?: string;
  manufacturer?: string;
  warning_temp_threshold?: number;
  overheat_temp_threshold?: number;
}

export interface ComponentResponse {
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
