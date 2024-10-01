

import {Router, Request, Response, NextFunction } from 'express';
import * as tilesController from './tilesController.js';

const tilesRouter = Router();


/**
 * @swagger
 * /tiles:
 *   get:
 *     summary: Retrieve application data
 *     responses:
 *       200:
 *         description: Successfully retrieved application data
 *       500:
 *         description: Internal Server Error
 */
tilesRouter.get('/:buildingId/:floor/:z/:x/:y.pbf',
    async (req:Request, res:Response, next:NextFunction) => 
        await tilesController.getBuildingTile(req,res,next)
);

/**
 * @swagger
 * /tiles/{area}:
 *   get:
 *     summary: Retrieve application data
 *     parameters:
 *       - name: area
 *         in: path
 *         required: true
 *         description: The area identifier for the tile
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved application data
 *       500:
 *         description: Internal Server Error
 */
tilesRouter.get('/:area',
    async (req:Request, res:Response, next:NextFunction) => 
        await tilesController.getGlobalTile(req,res,next)
);




/**
 * @swagger
 * /tiles:
 *   get:
 *     summary: Retrieve application data
 *     responses:
 *       200:
 *         description: Successfully retrieved application data
 *       500:
 *         description: Internal Server Error
 */
tilesRouter.get('/:z/:x/:y.pbf',
    async (req:Request, res:Response, next:NextFunction) => 
        await tilesController.getTile(req,res,next)
);


export default tilesRouter;


