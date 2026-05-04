import pino from 'pino'
import './env';

const logger = pino({
  name: process.env.APP_ID || 'app',
  level: process.env.LOG_LEVEL || 'info',
})

export default logger
