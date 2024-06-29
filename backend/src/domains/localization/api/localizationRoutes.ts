import {Router, Request, Response, NextFunction } from 'express';
import * as localizationController from './localizationController.js';

const localizationRouter = Router();

/**
 * @swagger
 * /localization/{buildingId}:
 *   post:
 *     summary: get user location
 *     responses:
 *       200:
 *         description: Successfully retrieved application data
 *         content:
 *           application/json:
 *       500:
 *         description: Internal Server Error
 *       422: 
*          description: Unprocessable Entity - Data is not good enough
 *          
 * 
 */
localizationRouter.post('/:buildingId',
    async (req:Request, res:Response, next:NextFunction) => 
        await localizationController.getWifiLocation(req,res,next));


export default localizationRouter;
