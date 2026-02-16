import { app } from './app';
import { env, connectDatabase, disconnectDatabase } from './config';
import { logger } from './utils';

const server = app.listen(env.PORT, async () => {
  await connectDatabase();
  logger.info(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  logger.info(`API available at http://localhost:${env.PORT}/api/${env.API_VERSION}`);
  logger.info(`Health check at http://localhost:${env.PORT}/health`);
});

const gracefulShutdown = async (signal: string): Promise<void> => {
  logger.info(`${signal} received. Starting graceful shutdown...`);

  server.close(async () => {
    logger.info('HTTP server closed');

    try {
      await disconnectDatabase();
      logger.info('Database connection closed');
      process.exit(0);
    } catch (error) {
      logger.error('Error during graceful shutdown:', error);
      process.exit(1);
    }
  });

  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Rejection:', reason);
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

export { server };
