import morgan from "morgan";
import logger from "@config/logger";
import type { Request, Response } from "express";

morgan.token("response-time", (_req: Request, res: Response) => {
  const responseTime = res.getHeader("X-Response-Time");
  return responseTime ? String(responseTime) : "0";
});

const format = ":method :url :status :res[content-length] - :response-time ms";

export const morganConfig = morgan(format, {
  stream: {
    write: (message: string) => {
      logger.info(message.trim());
    },
  },
});
