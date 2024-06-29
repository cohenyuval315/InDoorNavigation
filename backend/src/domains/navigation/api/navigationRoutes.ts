import {Router, Request, Response, NextFunction } from 'express';
import * as navigationController from './navigationController.js';
import { body } from 'express-validator';

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
    async (req:Request, res:Response, next:NextFunction) => 
        await navigationController.getNavigationRoute(req,res,next));


export default navigationRouter;
