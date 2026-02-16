import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { env } from './config';
import {
  errorHandler,
  requestLogger,
  rateLimiter,
  notFoundHandler,
} from './middlewares';
import { router } from './routes';

const app: Application = express();

app.use(helmet());
app.use(hpp());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(rateLimiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(requestLogger);

app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
