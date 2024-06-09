import * as adminController from '../controllers/admin-controller';
import * as buildingController from '../controllers/building-controller'
import * as ProcessingController from '../controllers/processing-controller';
import {Router, Request, Response, NextFunction } from 'express';
const adminRouter = Router();


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
adminRouter.get('/buildings/:id/graph',async (req:Request, res:Response, next:NextFunction) => await  buildingController.getAdminBuildingMapData(req,res,next));





/**
 * @swagger
 * /processing/map/:buildingId
 *   post:
 *     summary: get building graph data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
adminRouter.post('/processing/map/:buildingId',async (req:Request, res:Response, next:NextFunction) => await  ProcessingController.uploadProcessingMap(req,res,next));

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
adminRouter.get('/processing/map/:buildingId/:version',async (req:Request, res:Response, next:NextFunction) => await  ProcessingController.getProcessingMap(req,res,next));

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
adminRouter.post('/processing/route/:buildingId',async (req:Request, res:Response, next:NextFunction) => await  ProcessingController.uploadRoute(req,res,next));

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
adminRouter.get('/processing/route/:buildingId/:routeName',async (req:Request, res:Response, next:NextFunction) => await  ProcessingController.getRouteByName(req,res,next));



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
adminRouter.get('/processing/routes/:buildingId',async (req:Request, res:Response, next:NextFunction) => await  ProcessingController.getAllRoutes(req,res,next));


/**
 * @swagger
 * /admin/buildings:
 *   post:
 *     summary: create building data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
adminRouter.post('/buildings',async (req:Request, res:Response, next:NextFunction) => await  adminController.createBuildingData(req,res,next));

/**
 * @swagger
 * /admin/buildings:
 *   put:
 *     summary: update building data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
adminRouter.put('/buildings', async (req: Request, res: Response, next: NextFunction) => await  adminController.updateBuildingData(req,res,next));


/**
 * @swagger
 * /admin/buildings/{id}:
 *   delete:
 *     summary: delete building data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error 
 */
adminRouter.delete('/buildings/:id', async (req:Request, res:Response, next:NextFunction) => await adminController.deleteBuildingData(req,res,next));




/**
 * @swagger
 * /admin/buildings:
 *   delete: 
 *     summary: delete all buildings data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
adminRouter.delete('/buildings', async (req:Request, res:Response, next:NextFunction)  => await adminController.deleteAllBuildingsData(req,res,next))


/**
 * @swagger
 * /admin/buildings:
 *   post:
 *     summary: create building map data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
adminRouter.post('/buildings/map/:id', async (req:Request, res:Response, next:NextFunction)  => await adminController.createBuildingMapData(req,res,next));


/**
 * @swagger
 * /admin/buildings:
 *   put: 
 *     summary: update building map data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
adminRouter.put('/buildings/map/:id', async (req:Request, res:Response, next:NextFunction)  => await adminController.updateBuildingMapData(req,res,next));


/**
 * @swagger
 * /admin/buildings:
 *   delete: 
 *     summary: delete building map data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
adminRouter.delete('/buildings/map/:id',async (req:Request, res:Response, next:NextFunction)  => await adminController.deleteBuildingMapData(req,res,next));



/**
 * @swagger
 * /admin/buildings/map:
 *   delete:
 *     summary: delete all buildings map data
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
adminRouter.delete('/buildings/map', async (req:Request, res:Response, next:NextFunction)  => await adminController.deleteAllBuildingsMapsData(req, res,next));




/**
 * @swagger
 * /admin/users:
 *   delete:
 *     summary: delete all users
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
adminRouter.delete('/users', async (req:Request, res:Response, next:NextFunction)  => await adminController.deleteAllUsers(req, res, next));




// /**
//  * @swagger
//  * /admin:
//  *   post:
//  *     summary: Get Navigation Route
//  *     description: Retrieve a list of all users
//  *     parameters:
//  *       - in: header
//  *         name: Authorization
//  *         description: Access token for authorization
//  *         required: true
//  *         type: string
//  *         format: Bearer {token}
//  *       - in: body
//  *         name: user
//  *         description: User object
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *             username:
//  *               type: string
//  *             password:
//  *               type: string
//  *       - in: path
//  *         name: userId
//  *         description: ID of the user to retrieve.
//  *         required: true
//  *         schema:
//  *           type: string 
//   *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               username:
//  *                 type: string
//  *               password:
//  *                 type: string
//                  profile:
//                   type: object
//                   properties:
//                     firstName:
//                       type: string
//                     lastName:
//                       type: string
//                   required:
//                     - firstName
//                     - lastName
//  *     responses:
//  *       200:
//  *         description: A list of buildings
//  *       500:
//  *         description: Server error
//  */
// router.post('/admin2', (req, res) => {
   
// });

export default adminRouter;