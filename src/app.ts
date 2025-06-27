import express from 'express';
import { setupMiddleware, setupErrorHandlers } from '@middleware/index.js';
import { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import v1Routes from '@/routes/index.js';

const createApp = (): express.Application => {
  const app = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  setupMiddleware(app);

  app.use('/api', v1Routes);

  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Welcome to the API',
      timestamp: new Date().toISOString(),
    });
  });

  const uploadPath = path.join(__dirname, '../uploads');
  app.use('/uploads', express.static(uploadPath));

  setupErrorHandlers(app);
  return app;
};

export default createApp;
