export interface WebSocketRobotData {
  id: string;
  location: {
    x: number;
    y: number;
  };
  speed: number;
  status: string;
  ptz: {
    pan: number;
    tilt: number;
    zoomRgb: number;
    zoomThermal: number;
  };
  sensorStatus: {
    battery: number;
    signal: number;
    temperature: number;
    rgbCamera: boolean;
    thermalCamera: boolean;
    acusticCamera: boolean;
    lidar: boolean;
    imu: boolean;
  };
  timeStamp: string;
}

export interface RoutePoint {
  x: number;
  y: number;
  status: string;
  timeStamp: string;
}

export interface RobotRouteData {
  robotId: string;
  name: string;
  path: RoutePoint[];
  totalDistance: number;
  duration: number;
}

export interface RobotWithWebsockets {
  id: string;
  name: string;
  websockets?: Array<{
    locationX: number;
    locationY: number;
    status: string;
    timeStamp: Date;
    speed: number;
  }>;
}
