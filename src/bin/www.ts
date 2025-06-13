import createApp from "@/app.js";
import { syncDatabase } from "@config/database.js";
import logger from "@config/logger.js";
import { env } from "@config/env.js";
import { findAvailablePort } from "@utils/port.js";

const startServer = async (): Promise<void> => {
  try {
    // Initialize database
    logger.info("🔄 Initializing database...");
    await syncDatabase();
    logger.info("✅ Database connected successfully");

    // Create Express app
    const app = createApp();

    // Find available port
    const availablePort = await findAvailablePort(env.app.port);

    if (availablePort !== env.app.port) {
      logger.warn(`Port ${env.app.port} busy, using port ${availablePort}`);
    }

    // Start server
    const server = app.listen(availablePort, () => {
      logger.info(`🚀 Server running on port ${availablePort}`);
      logger.info(`📊 Health: http://localhost:${availablePort}/api/v1/health`);
      logger.info(`🌍 Environment: ${env.app.env}`);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`Received ${signal}, shutting down...`);
      server.close(() => {
        logger.info("Server closed");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
