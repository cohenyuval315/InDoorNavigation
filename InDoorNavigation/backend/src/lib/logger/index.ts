import expressWinston from 'express-winston';
import express from 'express';
import { logger } from './logger.js';

export const setupLogger = (app:express.Application) => {
    app.use(expressWinston.errorLogger({
        winstonInstance: logger,
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}} - {{err.message}}",
        dynamicMeta: (req, res, err) => {
          return {
            method: req.method,
            url: req.url,
            response: res.statusCode,
            requestBody: req.body,
            responseBody: res.locals.body,
          };
        }
      }));
}

export default logger;
