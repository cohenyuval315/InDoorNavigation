import winston from 'winston';
import { randomBytes } from 'crypto';
import * as stackTrace from 'stack-trace';
import * as path from 'path';


const { combine, timestamp, json, printf,colorize } = winston.format;

const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const appVersion = process.env.npm_package_version;

const generateLogId = (): string => randomBytes(16).toString('hex');

const customFormat = printf(({ level, message, timestamp }) => {
  const trace = stackTrace.get();
  const fileName = path.basename(trace[1].getFileName());
  const lineNumber = trace[1].getLineNumber();
  return `${timestamp} [${level}] [${fileName}:${lineNumber}] ${message}`;
});

const customFormat2 = printf(({ timestamp, level, message, ...data }) => {
  const response = {
      level,
      logId: generateLogId(),
      timestamp,
      appInfo: {
        appVersion,
        environment: process.env.NODE_ENV,
        proccessId: process.pid,
      },
      message,
      data,
    };
  return JSON.stringify(response,null,2);
})


export const logger = winston.createLogger({
    format: combine(
      colorize({
        all:true,
        colors:{ info: 'blue', error: 'red' },
        level:true,
        message:true
      }),
      timestamp({ format: timestampFormat }),
      // json(),
      customFormat
    ),
    // store logs in the console
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  });