import {Router, Request, Response, NextFunction } from 'express';
import * as navigationController from './navigationController.js';
import { body, param } from 'express-validator';

const navigationRouter = Router();



/**
 * @swagger
 * /navigation/{buildingId}:
 *   post:
 *     summary: navigation path
 *     responses:
 *       200:
 *         description: Successfully retrieved application data
 *         content:
 *           application/json:
 *       500:
 *         description: Internal Server Error
 *       404:
 *          no path found
 * 
 */
navigationRouter.post('/:buildingId',
    param("buildingId","building Id Is Not Presented In URL"),
    async (req:Request, res:Response, next:NextFunction) => 
        await navigationController.getNavigationRoute(req,res,next));


export default navigationRouter;
