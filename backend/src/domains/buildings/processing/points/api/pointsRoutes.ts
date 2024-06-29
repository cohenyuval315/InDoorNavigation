import {Router, Request, Response, NextFunction } from 'express';
import { isAdmin } from '../../../../../middlewares/permissionMiddleware.js';
import * as pointsController from './pointsController.js'


const pointsRouter = Router();


/**
 * @swagger
 * /buildings/processing/points/{buildingId}/{version}:
 *   get:
 *     summary: get building points data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
pointsRouter.get('/:buildingId/:version',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await  pointsController.getProcessingPoints(req,res,next));


/**
 * @swagger
 * /buildings/processing/points/{buildingId}:
 *   get:
 *     summary: get all building's points
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
pointsRouter.get('/:buildingId',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await  pointsController.getAllBuildingProcessingPoints(req,res,next));



/**
 * @swagger
 * /buildings/processing/points/{buildingId}:
 *   post:
 *     summary: create points data snapshot
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
pointsRouter.post('/:buildingId',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await pointsController.postProcessingPoints(req,res,next));


/**
 * @swagger
 * /buildings/processing/points/{buildingId}/{version}:
 *   delete:
 *     summary: delete points snapshot
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
pointsRouter.delete('/:buildingId/:version',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await pointsController.deleteProcessingPoints(req,res,next));

/**
 * @swagger
 * /buildings/processing/points/{buildingId}:
 *   delete:
 *     summary: delete all points snapshot of building
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
pointsRouter.delete('/processing/map/:buildingId',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await pointsController.deleteAllProcessingPointsByBuildingId(req,res,next));


/**
 * @swagger
 * /buildings/processing/points:
 *   post:
 *     summary: delete all snapshots of all buildings
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
pointsRouter.delete('',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await pointsController.deleteAllProcessingPoints(req,res,next));



export default pointsRouter;