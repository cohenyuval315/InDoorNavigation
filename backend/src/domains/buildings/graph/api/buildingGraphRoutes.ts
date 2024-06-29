import {Router, Request, Response, NextFunction } from 'express';
import * as buildingGraphController from './buildingGraphController.js';

const graphRouter = Router();



/**
 * @swagger
 * /buildings/graph/{buildingId}:
 *   get:
 *     summary: get building graph data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
graphRouter.get('/:buildingId',async (req:Request, res:Response, next:NextFunction) => await  buildingGraphController.getBuildingGraphData(req,res,next));



export default graphRouter;