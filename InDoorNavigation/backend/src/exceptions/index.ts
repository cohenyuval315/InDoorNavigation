import {errorHandler} from "./errorHandler.js";
import express, { NextFunction,Request,Response,Application } from 'express';

const setupErrorHandler = (app: Application) => {
    app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
        await errorHandler.handleError(err, res);
    });
}

const setupGlobalError = () => {
    
    process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
        // I just caught an unhandled promise rejection,
        // since we already have fallback handler for unhandled errors (see below),
        // let throw and let him handle that
        throw reason;
      });

    process.on('uncaughtException', (error: Error) => {
        errorHandler.handleError(error,null);
        if(!errorHandler.isTrustedError(error)){
            process.exit(1)
        }
    });

}

export {
    errorHandler,
    setupErrorHandler,
    setupGlobalError
}

