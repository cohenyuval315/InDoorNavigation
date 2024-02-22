import { Router } from 'express';
import * as authController from '../controllers/auth-controller';
const authRouter = Router();
import { body, query, validationResult,param,header } from 'express-validator';
const createEmailChain = () => body('email').isEmail();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Validate User Login Creds and Login into Session 
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: email and password
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Return Access Token
 *       500:
 *         description: Internal Server Error
 */
authRouter.post('/login',
    body('email').isEmail().notEmpty().escape().normalizeEmail({gmail_remove_dots:false}), 
    body('password').notEmpty().trim().escape(),
    async (req, res, next) => await authController.userLogin(req,res,next));


/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: User Logout
 *     description: Logout User From Session
 *     responses:
 *       200:
 *         description: None
 *       500:
 *         description: Internal Server Error
 */
authRouter.get('/logout', async (req, res, next) => await authController.userLogout(req,res,next));


/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User SignUp
 *     description: Create User Account
 *     responses:
 *       200:
 *         description: None
 *       500:
 *         description: Internal Server Error
 */
authRouter.post('/signup', async (req, res, next) => await authController.userSignUp(req,res,next));



// /**
//  * @swagger
//  * /refresh:
//  *   post:
//  *     summary: Refresh User Access Token
//  *     description: Return New Access Token
//  *     responses:
//  *       200:
//  *         description: Access Token
//  *       500:
//  *         description: Internal Server Error
//  */
// router.post('/refresh', (req, res) => refreshUserToken(req,res));



export default authRouter;