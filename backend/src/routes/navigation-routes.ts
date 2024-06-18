// import { Router } from 'express';
// const router = Router();
// /**
//  * @swagger
//  * /navigation/:id:
//  *   post:
//  *     summary: Get Navigation Route
//  *     description: Retrieve a list of all users
//  *     responses:
//  *       200:
//  *         description: A list of buildings
//  *       500:
//  *         description: Internal Server Error
//  */
// router.post('/nav', (req, res) => {
   
// });

// export default router;

import * as navigationController from '../controllers/navigation-controller';
import * as buildingController from '../controllers/building-controller'
import * as ProcessingController from '../controllers/processing-controller';
import {Router, Request, Response, NextFunction } from 'express';

const navigationRouter = Router();


/**
 * @swagger
 * /admin/buildings/:id/graph
 *   post:
 *     summary: get building graph data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
navigationRouter.post('/buildings/:buildingId',async (req:Request, res:Response, next:NextFunction) => await  navigationController.getNavigationRoute(req,res,next));

export default navigationRouter;
