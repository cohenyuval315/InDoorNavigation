import {Request,Response,NextFunction} from 'express'
import * as usersService from  '../services/users-service';
import {validationResult,ValidationError } from 'express-validator';
import { formatValidationErrors } from './utils';

export const userLogin = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const results = validationResult(req);
        if(!results.isEmpty()){     
            const errors = formatValidationErrors(results.array());
            return res.status(400).json({ error: `Validation error(s): ${errors}` });
        }
        // const validationErrors = [];

        // if (validationErrors.length) {
        //   req.flash('errors', validationErrors);
        //   return res.redirect('/login');
        // }
        // req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
      
        // passport.authenticate('local', (err, user, info) => {
        //   if (err) { return next(err); }
        //   if (!user) {
        //     req.flash('errors', info);
        //     return res.redirect('/login');
        //   }
        //   req.logIn(user, (err) => {
        //     if (err) { return next(err); }
        //     req.flash('success', { msg: 'Success! You are logged in.' });
        //     res.redirect(req.session.returnTo || '/');
        //   });
        // })(req, res, next);        
        const body = req.body;
        const {email,password} = body;
        const success = await usersService.userLogin();
        return res.sendStatus(200);
    }catch(error){

    }
    
}

export const userSignUp = async (req:Request,res:Response,next:NextFunction) => {
    try{
        return await usersService.userSignUp();
    }catch(error){
      next(error);
    }
    
}

export const userLogout = async (req:Request,res:Response,next:NextFunction) => {
    try{
        return await usersService.userLogout();
    }catch(error){
      next(error);
    }
    
}

// export const refreshUserToken = (req,res) => {
    
// }

