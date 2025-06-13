import express from "express";
import { corsConfig } from "@config/cors";
import { securityConfig } from "@/config/security";
import { morganConfig } from "@/config/morgan";
import { errorHandler } from "@/middleware/error.middleware";
import { notFoundHandler } from "@middleware/not-found.middleware";

export const setupMiddleware = (app: express.Application) => {
  // Security middleware
  app.use(securityConfig.helmet);
  app.use(securityConfig.compression);

  // CORS
  app.use(corsConfig);

  // Logging
  app.use(morganConfig);

  // Body parsing
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
};

export const setupErrorHandlers = (app: express.Application) => {
  // 404 handler
  app.use(notFoundHandler);

  // Error handler
  app.use(errorHandler);
};
