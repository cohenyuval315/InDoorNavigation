import {Router, Request, Response, NextFunction } from 'express';
import * as appDataController from './appDataController.js';

const appDataRouter = Router();


/**
 * @swagger
 * /app:
 *   get:
 *     summary: Retrieve application data
 *     responses:
 *       200:
 *         description: Successfully retrieved application data
 *       500:
 *         description: Internal Server Error
 */
appDataRouter.get('/',
    async (req:Request, res:Response, next:NextFunction) => 
        await appDataController.getAppData(req,res,next)
);



export default appDataRouter;
