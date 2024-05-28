import {Request,Response,NextFunction} from 'express'
import * as localizationService from '../services/localization-service';
import * as navigationService from '../services/navigation-service';
// import { promisify } from 'util';
// import { randomBytes } from 'crypto';
// import { createTransport } from 'nodemailer';
// import { authenticate } from 'passport';
// import { startCase, toLower } from 'lodash';
// import { isEmail, isEmpty, normalizeEmail, isLength, escape, isHexadecimal } from 'validator';
// import { isValid } from 'mailchecker';
// import User, { findOne, findById, deleteOne } from '../models/User';

export const getNavigationRoute = async (req:Request,res:Response,next:NextFunction) => {
    // const buildingId = req.params.id;
    // const { 
    //   srcWaypoint,
    //   checkpointsWaypoints, 
    //   destWaypoint, 
    //   isInOrder } = req.body;
    try{
      const route = await navigationService.getNavigationRoute();
      return res.status(200).json(route);
    }catch(error){
      next(error);
    }

    //   if (!validator.isString(name) || validator.isEmpty(name)) {
    //     return res.status(400).json({ error: 'Name must be a non-empty string' });
    //   }      

}

export const getUserLocation  = async (req:Request,res:Response,next:NextFunction) => {
  try{
    return await localizationService.getUserLocation();
  }catch(error){
    next(error);
  }
  
}



  // if (!validator.isString(name) || validator.isEmpty(name)) {
  //   return res.status(400).json({ error: 'Name must be a non-empty string' });
  // }
  // validator.is

