import cors from 'cors';
import { env } from '@config/env.js';

export const corsConfig = cors({
  origin: env.cors.origin,
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
