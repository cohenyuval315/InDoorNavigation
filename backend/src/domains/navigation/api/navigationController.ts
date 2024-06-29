import {Request,Response,NextFunction} from 'express'
import * as navigationService from '../domain/navigationService.js';


export const getNavigationRoute = async (req:Request,res:Response,next:NextFunction) => {
  // console.log(`Request IP: ${req.ip}`);
   const buildingId = req.params.buildingId;
    try{
      const body = req.body;
      const {
        destinationPOIId,
        currentLocation,
        accessability
      } = body;
      const route = await navigationService.getNavigationRoute(
        buildingId,
        currentLocation,
        destinationPOIId,
        accessability
      );
      res.status(200).json({data:route});
      return
    }catch(error){
      next(error);
    }


}