import {Router, Request, Response, NextFunction } from 'express';
import * as BuildingController from '../controllers/building-controller'
import * as navigationController from '../controllers/navigation-controller';
import * as userController from '../controllers/user-controller';
const userRouter = Router();

/**
 * @swagger
 * /buildings:
 *   get:
 *     summary: Get all Buildings Data
 *     description: Retrieve a list of buildings data
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Internal Server Error
 */
userRouter.get('/buildings', async (req:Request, res:Response, next:NextFunction) => await BuildingController.getAllBuildingsData(req,res,next));



/**
 * @swagger
 * /buildings/map/{id}:
 *   get:
 *     summary: Get building's map data
 *     description: Get building's map data
 *     responses:
 *       200:
 *         description: Building's Map Data
 *       500:
 *         description: Internal Server Error
 */
userRouter.get('/buildings/map/:id', async (req:Request, res:Response, next:NextFunction) => await BuildingController.getBuildingMapData(req,res,next));

/**
 * @swagger
 * /navigation/:id:
 *   post:
 *     summary: Get Navigation Route
 *     description: Retrieve an Navigation Route
 *     responses:
 *       200:
 *         description: Route's Path - Nodes and Edges
 *       400:
 *         description: Bad Request - missing mandatory parameters
 *       500:
 *         description: Internal Server Error
 */
userRouter.post('/navigation/:id', async (req:Request, res:Response, next:NextFunction) => await navigationController.getNavigationRoute(req,res,next));


/**
 * @swagger
 * /system:
 *   post:
 *     summary: return user system configuration by device.
 *     description: Retrieve navgiation and map configurations tailored for device by parameters.
 *     responses:
 *       200:
 *         description: configuration json
 *       500:
 *         description: Internal Server Error
 */
userRouter.post('/system', async (req:Request, res:Response, next:NextFunction) => await userController.getUserSystemConfiguration(req,res,next));


/**
 * @swagger
 * /account:
 *   get:
 *     summary: get account data
 *     description:
 *     responses:
 *       200:
 *         description: 
 *       500:
 *         description: Internal Server Error
 */
userRouter.get('/account', async (req:Request, res:Response, next:NextFunction) => await userController.getUserAccount(req,res,next));


/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update User's Profile.
 *     description: update user settings and configurations
 *     responses:
 *       200:
 *         description: None
 *       500:
 *         description: Internal Server Error
 */
userRouter.put('/profile',async (req:Request, res:Response, next:NextFunction) => await userController.updateUserProfile(req,res,next));


export default userRouter;

















// router.post('/', (req: Request, res: Response) => {
//     res.send('Login route');
// });
  


/**
 * 
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request, invalid parameters
 *       '401':
 *         description: Unauthorized, authentication required
 *       '403':
 *         description: Forbidden, permission denied
 *       '404':
 *         description: Not found, resource not available
 *       '500':
 *         description: Internal server error
 */

/**
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user's ID
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email address
 *       required:
 *         - id
 *         - username
 */

