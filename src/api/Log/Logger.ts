import wiston from 'winston';
import { ApiError } from '../common/ApiError';

const {
  combine,
  timestamp,
  json,
  printf
} = wiston.format;

const timestampFormat = 'DD-MMM-YYYY HH:mm:ss';

export const apiLogger = wiston.createLogger({
  format: combine(
    timestamp({format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        timestamp,
        message,
        data,
      };

      return JSON.stringify(response);
    })
  ),
  transports: [
    new wiston.transports.Console(),
  ],
});

export const logApiError = (apiError: ApiError) => {
  apiLogger.error('got one API Error', { apiError });
};
