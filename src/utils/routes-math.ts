import type { RoutePoint } from '@/types/robots/robot-websocket';

export function calculateTotalDistance(path: RoutePoint[]): number {
  let dist = 0;
  for (let i = 1; i < path.length; i++) {
    const prevPoint = path[i - 1];
    const currentPoint = path[i];
    if (prevPoint && currentPoint) {
      const { x: x1, y: y1 } = prevPoint;
      const { x: x2, y: y2 } = currentPoint;
      dist += Math.hypot(x2 - x1, y2 - y1);
    }
  }
  return Math.round(dist * 100) / 100;
}

export function calculateDuration(path: RoutePoint[]): number {
  if (path.length < 2) return 0;
  const lastPoint = path.at(-1);
  const firstPoint = path[0];
  if (!lastPoint?.timeStamp || !firstPoint?.timeStamp) return 0;
  return (
    new Date(lastPoint.timeStamp).getTime() -
    new Date(firstPoint.timeStamp).getTime()
  );
}
