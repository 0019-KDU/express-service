import morgan, { StreamOptions } from 'morgan';
import { stream } from '../utils/logger';

const streamOptions: StreamOptions = {
  write: stream.write,
};

const skip = (): boolean => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const format =
  ':remote-addr :method :url :status :res[content-length] - :response-time ms';

export const requestLogger = morgan(format, { stream: streamOptions, skip });
