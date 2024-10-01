import {Router, Request, Response, NextFunction } from 'express';
import * as buildingMapController from './buildingMapController.js';

const mapRouter = Router();

/**
 * @swagger
 * /buildings/map/{buildingId}:
 *   get:
 *     summary: Get building's map data
 *     description: Get building's map data
 *     responses:
 *       200:
 *         description: Building's Map Data
 *       500:
 *         description: Internal Server Error
 */
mapRouter.get('/:buildingId', 
    async (req:Request, res:Response, next:NextFunction) => 
        await buildingMapController.getBuildingMapData(req,res,next));


mapRouter.get("/:buildingId/tiles/:zoom/:x/:y/:z",
async (req:Request, res:Response, next:NextFunction) => 
    await buildingMapController.getBuildingTiles(req,res,next));



export default mapRouter;









