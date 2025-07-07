export interface PatrolRouteCreateData {
  name: string;
  description?: string;
  total_distance?: number;
  estimated_duration?: number;
}

export interface PatrolRouteUpdateData {
  name?: string;
  description?: string;
  total_distance?: number;
  estimated_duration?: number;
}

export interface PatrolRouteResponse {
  id: number;
  name: string;
  description: string | null;
  total_distance: number;
  estimated_duration: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}
