import {Request,Response,NextFunction} from 'express'
import * as authService from  '../domain/authService.js';
import {validationResult,ValidationError } from 'express-validator';


export const userLogin = async (req:Request,res:Response,next:NextFunction) => {
    try{     
        const body = req.body;
        const {email,password} = body;
        const success = await authService.userLogin(email,password);
        return res.sendStatus(200);
    }catch(error){
        next(error)
    }
    
}



export const userSignUp = async (req:Request,res:Response,next:NextFunction) => {
    try{
        return await authService.userSignUp();
    }catch(error){
      next(error);
    }
    
}



// export const refreshUserToken = (req,res) => {
    
// }

