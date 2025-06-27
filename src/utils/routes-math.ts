import type { RoutePoint } from '@/types/robot-websocket';

export function calculateTotalDistance(path: RoutePoint[]): number {
  let dist = 0;
  for (let i = 1; i < path.length; i++) {
    const { x: x1, y: y1 } = path[i - 1]!;
    const { x: x2, y: y2 } = path[i]!;
    dist += Math.hypot(x2 - x1, y2 - y1);
  }
  return Math.round(dist * 100) / 100;
}

export function calculateDuration(path: RoutePoint[]): number {
  if (path.length < 2) return 0;
  return (
    new Date(path.at(-1)!.timeStamp).getTime() -
    new Date(path[0]!.timeStamp).getTime()
  );
}
