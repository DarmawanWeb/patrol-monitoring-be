import express from 'express';
import { setupMiddleware, setupErrorHandlers } from '@middleware/index.js';
import { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import v1Routes from '@/routes/index.js';

const createApp = (): express.Application => {
  const app = express();

  // Mendapatkan __dirname dengan ES module
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Setup middleware
  setupMiddleware(app);

  // Routes
  app.use('/api', v1Routes);

  // Route utama
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Welcome to the API',
      timestamp: new Date().toISOString(),
    });
  });

  // Menyajikan file statis dari folder uploads
  const uploadPath = path.join(__dirname, '../uploads');
  app.use('/uploads', express.static(uploadPath));

  // Error handlers
  setupErrorHandlers(app);

  return app;
};

export default createApp;
