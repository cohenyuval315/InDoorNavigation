import {Request,Response,NextFunction} from 'express'
import BuildingWifiMap from '../../buildings/wifi/data-access/index.js';
import * as localizationService from '../domain/localizationService.js';

export const getWifiLocation = async (req:Request,res:Response,next:NextFunction) => {
    try{
      const buildingId = req.params.buildingId
      const body = req.body;
      const wifiMap = BuildingWifiMap.find({
        buildingId:buildingId
      })
      if (!wifiMap){
        console.error("getUserLocation error = could not find wifi map ");
      }
      const {userState, wifiScanData} = body;
      const response = await localizationService.getUserLocationByWifi(wifiMap,userState,wifiScanData);
      if (response){
        res.status(200).json({
          data:response
        })
  
        return;
      }else{
        res.status(500).json({
          message:"failed"
        })
        return;
      }
    }catch(error){
      next(error);
    }
  }