import express from 'express';
import { setupMiddleware, setupErrorHandlers } from '@middleware/index.js';
import { Request, Response } from 'express';
import v1Routes from '@/routes/index.js';
import {
  uploadStatic,
  uploadHeadersMiddleware,
} from '@/middleware/upload.middleware.js';

const createApp = (): express.Application => {
  const app = express();

  setupMiddleware(app);

  app.use('/api', v1Routes);

  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Welcome to the Patrol BE API',
      timestamp: new Date().toISOString(),
      author: 'I Wayan Agus Darmawan',
      version: '1.0.0',
    });
  });
  app.use('/uploads', uploadHeadersMiddleware, uploadStatic);

  setupErrorHandlers(app);
  return app;
};

export default createApp;
