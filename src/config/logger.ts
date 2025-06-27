import pino from 'pino';
import { env } from '@config/env.js';

const isDevelopment = env.app.env === 'development';

const logger = pino({
  level: isDevelopment ? 'debug' : 'info',
  ...(isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  }),
  formatters: {
    level: (label: string) => {
      return { level: label };
    },
  },
});

export default logger;
