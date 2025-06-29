import express, { Handler, Request, Response, NextFunction } from 'express';

import path from 'path';
import { fileURLToPath } from 'url';
import { env } from '@config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, '../../uploads');

export const uploadStatic: Handler = express.static(uploadPath);

export const uploadHeadersMiddleware: Handler = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.setHeader('Access-Control-Allow-Origin', env.cors.origin);
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
};
