export interface RouteWaypointCreateData {
  routeId: number;
  sequenceOrder: number;
  locationX: number;
  locationY: number;
  orientationZ: number;
  waypointType: string;
  cameraPan?: number;
  cameraTilt?: number;
  rgbCameraZoom?: number;
  thermalCameraZoom?: number;
}

export interface RouteWaypointBulkCreateData {
  routeId: number;
  waypoints: Omit<RouteWaypointCreateData, 'routeId'>[];
}

export interface RouteWaypointUpdateData {
  routeId?: number;
  sequenceOrder?: number;
  locationX?: number;
  locationY?: number;
  orientationZ?: number;
  waypointType?: string;
  cameraPan?: number;
  cameraTilt?: number;
  rgbCameraZoom?: number;
  thermalCameraZoom?: number;
}

export interface RouteWaypointResponse {
  id: number;
  routeId: number;
  sequenceOrder: number;
  locationX: number;
  locationY: number;
  orientationZ: number;
  waypointType: string;
  cameraPan: number | null;
  cameraTilt: number | null;
  rgbCameraZoom: number | null;
  thermalCameraZoom: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
