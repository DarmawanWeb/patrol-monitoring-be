import { Router, Request, Response } from "express";
import { env } from "@config/env";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.app.env,
    version: process.env.npm_package_version || "1.0.0",
  });
});

export default router;
