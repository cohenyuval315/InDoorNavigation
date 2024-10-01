import {Request,Response,NextFunction} from 'express'
import * as navigationService from '../domain/navigationService.js';
import { logger } from '../../../lib/logger/logger.js';


export const getNavigationRoute = async (req:Request,res:Response,next:NextFunction) => {
  // console.log(`Request IP: ${req.ip}`);
   const buildingId = req.params.buildingId;
    try{
      const body = req.body;
      const {
        destinationPOIId,
        currentLocation,
        accessibility
      } = body;
      const route = await navigationService.getNavigationRoute(
        buildingId,
        currentLocation,
        destinationPOIId,
        accessibility
      );
      if(route){
        res.status(200).json({data:route});
      }else{
        res.sendStatus(404);
      }
    }catch(error){
      next(error);
    }


}