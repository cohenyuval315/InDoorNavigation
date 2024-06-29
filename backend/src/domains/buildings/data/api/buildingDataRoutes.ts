import {Router, Request, Response, NextFunction } from 'express';
import * as buildingController from './buildingDataController.js';
import { body, param } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { isAdmin, isPermitted } from '../../../../middlewares/permissionMiddleware.js';

const buildingDataRouter = Router();

const buildingIdParamChain = () => param('buildingId').notEmpty().withMessage('Building ID cannot be empty');


const generalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100, // limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});


/**
 * @swagger
 * /buildings/data:
 *   get:
 *     summary: Get all Buildings Data
 *     description: Retrieve a list of buildings data
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Internal Server Error
 */
buildingDataRouter.get('', 
    generalLimiter,
    async (req:Request, res:Response, next:NextFunction) => 
        await buildingController.getAllBuildingsData(req,res,next));



/**
 * @swagger
 * /buildings/data/{buildingId}:
 *   get:
 *     summary: Get all Buildings Data
 *     description: Retrieve a list of buildings data
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Internal Server Error
 */
buildingDataRouter.get('/:buildingId', 
    generalLimiter,
    buildingIdParamChain,
    async (req:Request, res:Response, next:NextFunction) => 
        await buildingController.getBuildingData(req,res,next));





/**
 * @swagger
 * /buildings/data:
 *   post:
 *     summary: create building data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
buildingDataRouter.post('',
    generalLimiter,
    isAdmin,
    body('buildingId').notEmpty().isString(),
    body('buildingData').notEmpty().isJSON(),
    body('override').notEmpty().isBoolean(),
    async (req:Request, res:Response, next:NextFunction) => 
        await buildingController.postBuildingData(req,res,next));

/**
 * @swagger
 * /buildings/data/{buildingId}:
 *   put:
 *     summary: update building data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
buildingDataRouter.put('/:buildingId',
    generalLimiter,
    isAdmin,
    body('buildingId').notEmpty().isString(),
    body('buildingData').notEmpty().isJSON(),
    async (req: Request, res: Response, next: NextFunction) => 
        await  buildingController.putBuildingData(req,res,next));



/**
 * @swagger
 * /buildings/data/{buildingId}:
 *   delete:
 *     summary: delete Building Data
 *     description: Retrieve a list of buildings data
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Internal Server Error
 */
buildingDataRouter.delete('/:buildingId', 
    generalLimiter,
    isAdmin,
    buildingIdParamChain,
    async (req:Request, res:Response, next:NextFunction) => 
        await buildingController.deleteBuildingData(req,res,next));





/**
 * @swagger
 * /buildings/data:
 *   delete: 
 *     summary: delete all buildings data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
buildingDataRouter.delete('', 
    generalLimiter,
    isAdmin,
    async (req:Request, res:Response, next:NextFunction)  => 
        await buildingController.deleteAllBuildingsData(req,res,next))











export default buildingDataRouter;




