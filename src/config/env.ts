import { config } from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
config({ path: envFile });

interface EnvConfig {
  app: {
    port: number;
    env: string;
  };
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
  cors: {
    origin: string;
  };
  jwt: {
    secret: string;
    expiration: string;
  };
  refreshToken: {
    secret: string;
    expiration: string;
  };
  websocketPort: number;
}

const getEnvConfig = (): EnvConfig => {
  return {
    app: {
      port: parseInt(process.env.PORT || '3000', 10),
      env: process.env.NODE_ENV || 'development',
    },
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      name: process.env.DB_NAME || 'database',
    },
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'default-secret',
      expiration: process.env.JWT_EXPIRATION || '1h',
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret',
      expiration: process.env.REFRESH_TOKEN_EXPIRATION || '30d',
    },
    websocketPort: parseInt(process.env.WEBSOCKET_PORT || '8082', 10),
  };
};

export const env = getEnvConfig();
