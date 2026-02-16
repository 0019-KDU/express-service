import { Router } from 'express';
import { userRoutes } from './user.routes';
import { healthRoutes } from './health.routes';
import { env } from '../config';

const router = Router();

router.use('/health', healthRoutes);
router.use(`/api/${env.API_VERSION}/users`, userRoutes);

export { router };
