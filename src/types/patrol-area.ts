export interface CreatePatrolAreaData {
  name: string;
  image: string;
  mapCenterLat: number;
  mapCenterLng: number;
  description?: string;
  address?: string;
  cargingDockLat?: number;
  cargingDockLng?: number;
  cargingDockYaw?: number;
}

export interface UpdatePatrolAreaData {
  name?: string;
  image?: string;
  mapCenterLat?: number;
  mapCenterLng?: number;
  description?: string;
  address?: string;
  cargingDockLat?: number;
  cargingDockLng?: number;
  cargingDockYaw?: number;
}

export interface PatrolAreaResponse {
  id: number;
  name: string;
  image: string;
  mapCenterLat: number;
  mapCenterLng: number;
  description: string | null;
  address: string | null;
  cargingDockLat: number | null;
  cargingDockLng: number | null;
  cargingDockYaw: number | null;
  createdAt: string;
  updatedAt: string;
}
