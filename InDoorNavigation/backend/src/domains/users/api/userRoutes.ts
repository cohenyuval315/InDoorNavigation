

import {Router, Request, Response, NextFunction } from 'express';
import * as userController from './userController.js';
import * as authController from './authController.js'
import { isAdmin } from '../../../middlewares/permissionMiddleware.js';

const userRouter = Router();



/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: get user location
 *     responses:
 *       200:
 *         description: Successfully retrieved application data
 *         content:
 *           application/json:
 *       500:
 *         description: Internal Server Error
 *       401:
 *          description: Unauthorized
 *          
 *          
 * 
 */
userRouter.post('/login',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await authController.userLogin(req,res,next)
);



/**
 * @swagger
 * /user/signUp:
 *   post:
 *     summary: get user location
 *     responses:
 *       200:
 *         description: Successfully retrieved application data
 *       500:
 *         description: Internal Server Error
 *          
 * 
 */
userRouter.post('/signUp',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await authController.userSignUp(req,res,next)
);




/**
 * @swagger
 * /user:
 *   delete:
 *     summary: get user location
 *     responses:
 *       200:
 *         description: delete all users
 *       500:
 *         description: Internal Server Error
 */
userRouter.delete('/',
    isAdmin,
    async (req:Request, res:Response, next:NextFunction) => 
        await userController.deleteAllUsers(req,res,next)
);


export default userRouter;
