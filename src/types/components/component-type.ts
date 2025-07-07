export interface ComponentTypeCreateData {
  name: string;
  icon: string;
}

export interface ComponentTypeUpdateData {
  name?: string;
  icon?: string;
}

export interface ComponentTypeResponse {
  id: number;
  name: string;
  icon: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
