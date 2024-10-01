import {Router, Request, Response, NextFunction } from 'express';
import * as apiController from './apiController.js';

const apiRouter = Router();


/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: 
 *     responses:
 *       200:
 *         description: Successfully 
 *       500:
 *         description: Internal Server Error
 */
apiRouter.get('/ping',
    async (req:Request, res:Response, next:NextFunction) => 
        await apiController.ping(req,res,next)
);


export default apiRouter;
