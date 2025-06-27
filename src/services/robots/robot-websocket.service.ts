import logger from '@/config/logger';
import { Robot, RobotWebsocket } from '@/database/models/robots/index.js';
import type {
  WebSocketRobotData,
  RobotRouteData,
  RoutePoint,
  RobotWithWebsockets,
} from '@/types/robot-websocket';
import { Op } from 'sequelize';
import {
  calculateDuration,
  calculateTotalDistance,
} from '@/utils/routes-math.js';

export default class RobotWebsocketService {
  async storeWebsocketData(
    data: WebSocketRobotData,
  ): Promise<RobotWebsocket | null> {
    try {
      const robot = await Robot.findByPk(data.id);
      if (!robot) {
        logger.warn(
          `Robot with ID "${data.id}" not found. Skipping data storage.`,
        );
        return null;
      }

      const timestamp = new Date(data.timeStamp);

      const isDuplicate = await RobotWebsocket.findOne({
        where: { robotId: data.id, timeStamp: timestamp },
      });

      if (isDuplicate) {
        logger.info(
          `Duplicate data for robot "${data.id}" at "${data.timeStamp}". Skipping.`,
        );
        return isDuplicate;
      }

      return await RobotWebsocket.create({
        robotId: data.id,
        locationX: data.location.x,
        locationY: data.location.y,
        speed: data.speed,
        status: data.status,
        panAngle: data.ptz.pan,
        tiltAngle: data.ptz.tilt,
        zoomRgb: data.ptz.zoomRgb,
        zoomThermal: data.ptz.zoomThermal,
        batteryLevel: data.sensorStatus.battery,
        signalStrength: data.sensorStatus.signal,
        temperature: data.sensorStatus.temperature,
        rgbCameraStatus: data.sensorStatus.rgbCamera,
        thermalCameraStatus: data.sensorStatus.thermalCamera,
        acusticCameraStatus: data.sensorStatus.acusticCamera,
        lidarStatus: data.sensorStatus.lidar,
        imuStatus: data.sensorStatus.imu,
        timeStamp: timestamp,
      });
    } catch (error) {
      logger.error('Failed to store robot status', error as Error);
      return null;
    }
  }

  async getAllRobotRoutes(
    limit = 1000,
    startTime?: Date,
    endTime?: Date,
  ): Promise<RobotRouteData[]> {
    try {
      const robots = await Robot.findAll({
        attributes: ['id', 'name'],
        include: [this.buildWebsocketInclude(limit, startTime, endTime)],
      });

      return robots.map(this.transformRobotWithWebsockets);
    } catch (error) {
      logger.error('Error getting all robot routes:', error as Error);
      throw error;
    }
  }

  async getRobotRouteById(
    robotId: number,
    limit = 1000,
    startTime?: Date,
    endTime?: Date,
  ): Promise<RobotRouteData | null> {
    try {
      const robot = await Robot.findByPk(robotId, {
        attributes: ['id', 'name'],
        include: [this.buildWebsocketInclude(limit, startTime, endTime)],
      });

      if (!robot) {
        logger.warn(`Robot with ID "${robotId}" not found.`);
        return null;
      }

      return this.transformRobotWithWebsockets(robot);
    } catch (error) {
      logger.error(
        `Error getting route for robot with ID "${robotId}":`,
        error as Error,
      );
      throw error;
    }
  }

  private buildWebsocketInclude(
    limit: number,
    startTime?: Date,
    endTime?: Date,
  ) {
    const timeFilter: Record<string | symbol, unknown> = {};
    if (startTime) timeFilter[Op.gte] = startTime;
    if (endTime) timeFilter[Op.lte] = endTime;

    return {
      model: RobotWebsocket,
      as: 'websockets',
      attributes: ['locationX', 'locationY', 'speed', 'status', 'timeStamp'],
      required: false,
      separate: true,
      order: [['timeStamp', 'ASC']] as [string, string][],
      limit,
      where: Object.keys(timeFilter).length ? { timeStamp: timeFilter } : {},
    };
  }

  private transformRobotWithWebsockets(
    robot: Robot | RobotWithWebsockets,
  ): RobotRouteData {
    const websockets = (robot as RobotWithWebsockets).websockets ?? [];

    const path: RoutePoint[] = websockets.map((ws) => ({
      x: Number(ws.locationX),
      y: Number(ws.locationY),
      status: ws.status,
      speed: Number(ws.speed),
      timeStamp: ws.timeStamp.toISOString(),
    }));

    return {
      robotId: robot.id,
      name: robot.name,
      path,
      totalDistance: calculateTotalDistance(path),
      duration: calculateDuration(path),
    };
  }
}
