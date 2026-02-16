import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError } from '../utils';

const router = Router();

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  database: 'connected' | 'disconnected';
  version: string;
}

router.get('/', async (_req: Request, res: Response) => {
  let dbStatus: 'connected' | 'disconnected' = 'disconnected';

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'connected';
  } catch {
    dbStatus = 'disconnected';
  }

  const healthStatus: HealthStatus = {
    status: dbStatus === 'connected' ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus,
    version: process.env.npm_package_version || '1.0.0',
  };

  if (healthStatus.status === 'unhealthy') {
    return sendError(res, 'Service unhealthy', 503);
  }

  return sendSuccess(res, healthStatus, 'Service healthy');
});

router.get('/ready', async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return sendSuccess(res, { ready: true }, 'Service ready');
  } catch {
    return sendError(res, 'Service not ready', 503);
  }
});

router.get('/live', (_req: Request, res: Response) => {
  return sendSuccess(res, { alive: true }, 'Service alive');
});

export { router as healthRoutes };
