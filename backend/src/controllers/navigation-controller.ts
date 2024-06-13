import {Request,Response,NextFunction} from 'express'
import * as localizationService from '../services/localization-service';
import * as navigationService from '../services/navigation-service';
import BuildingWifiMap from '../models/BuildingWifiMap';

export const getNavigationRoute = async (req:Request,res:Response,next:NextFunction) => {
    const buildingId = req.params.id;
    // const { 
    //   srcWaypoint,
    //   checkpointsWaypoints, 
    //   destWaypoint, 
    //   isInOrder } = req.body;
    try{
      const body = req.body;
      const {
        destination,
        currentLocation,
        accessability
      } = body;
      const route = await navigationService.getNavigationRoute(
        buildingId,
        currentLocation,
        destination,
        accessability
      );
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
    const buildingId = req.params.buildingId
    const body = req.body;
    const wifiMap = BuildingWifiMap.find({
      buildingId:buildingId
    })
    if (!wifiMap){
      console.error("getUserLocation error = could not find wifi map ");
    }
    const {position, wifiScanData} = body;
    const response = await localizationService.getUserLocation(buildingId,wifiMap,position,wifiScanData);
    return response;
  }catch(error){
    next(error);
  }
  
}



  // if (!validator.isString(name) || validator.isEmpty(name)) {
  //   return res.status(400).json({ error: 'Name must be a non-empty string' });
  // }
  // validator.is

