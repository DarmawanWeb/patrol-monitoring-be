import { Request, Response, NextFunction } from "express";
import logger from "@config/logger.js";
import { env } from "@config/env.js";

interface ErrorWithStatus extends Error {
  status?: number;
  statusCode?: number;
}

export const errorHandler = (
  error: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error
  logger.error({
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  const statusCode = error.status || error.statusCode || 500;
  const isDevelopment = env.app.env === "development";

  res.status(statusCode).json({
    error: error.message || "Internal Server Error",
    status: statusCode,
    timestamp: new Date().toISOString(),
    path: req.path,
    ...(isDevelopment && { stack: error.stack }),
  });
};
