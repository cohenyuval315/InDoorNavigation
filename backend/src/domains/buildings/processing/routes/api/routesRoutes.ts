import {Router, Request, Response, NextFunction } from 'express';
import * as routesController from './routesController.js'
import { isAdmin } from '../../../../../middlewares/permissionMiddleware.js';

const routesRouter = Router();

/**
 * @swagger
 * /buildings/processing/routes/{buildingId}/titles:
 *   get:
 *     summary: get all routes titles of building
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
routesRouter.get('/:buildingId/titles',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await  routesController.getAllRoutesTitles(req,res,next));


/**
 * @swagger
 * /buildings/processing/routes/{buildingId}:
 *   post:
 *     summary: create building route
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
routesRouter.post('/processing/route/:buildingId',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await  routesController.postRoute(req,res,next));

/**
 * @swagger
 * /buildings/processing/routes/{buildingId}/{routeName}:
 *   get:
 *     summary: get building's route by name
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
routesRouter.get('/processing/route/:buildingId/:routeName',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await  routesController.getRouteByName(req,res,next));



/**
 * @swagger
 * /buildings/processing/routes/{buildingId}:
 *   get:
 *     summary: get all building's routes
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
routesRouter.get('/:buildingId',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await  routesController.getAllRoutes(req,res,next));


/**
 * @swagger
 * /buildings/processing/routes/{buildingId}:
 *   delete:
 *     summary: delete all building's routes
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
routesRouter.delete('/:buildingId',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await routesController.deleteBuildingRoutes(req,res,next));


/**
 * @swagger
 * /buildings/processing/routes:
 *   post:
 *     summary: delete all routes of all buildings
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
routesRouter.delete('',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await routesController.deleteAllRoutes(req,res,next));


/**
 * @swagger
 * /buildings/processing/routes/{buildingId}/{routeName}:
 *   delete:
 *     summary: delete building's route by name
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
routesRouter.delete('/:buildingId/:routeName',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await routesController.deleteBuildingRouteByName(req,res,next));




export default routesRouter;