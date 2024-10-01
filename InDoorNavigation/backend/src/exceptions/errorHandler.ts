import logger from "../lib/logger/index.js";
import {Response} from 'express';
import { AppError } from "./app-error.js";

class ErrorHandler {
    public async handleError(error: Error, responseStream: Response | undefined | null): Promise<void> {
      logger.error(error);
      //await logger.logError(err);
      // await sendMailToAdminIfCritical();
      // await saveInOpsQueueIfCritical();
      // await determineIfOperationalError();
    //   fireMonitoringMetric(error);
    //   crashIfUntrustedErrorOrSendResponse(error, responseStream);
    };


    public isTrustedError(error: Error) {
      if (error instanceof AppError) {
        return error.isOperational;
      }
      return false;
    }
  }
  
export const errorHandler = new ErrorHandler();