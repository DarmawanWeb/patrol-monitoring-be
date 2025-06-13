import express from "express";
import { setupMiddleware, setupErrorHandlers } from "@middleware/index";
import { Router, Request, Response } from "express";

import v1Routes from "@/routes";

const createApp = (): express.Application => {
  const app = express();

  // Setup middleware
  setupMiddleware(app);

  // Routes
  app.use("/api", v1Routes);

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Welcome to the API",
      timestamp: new Date().toISOString(),
    });
  });

  // Error handlers
  setupErrorHandlers(app);

  return app;
};

export default createApp;
