import {Request,Response,NextFunction} from 'express'
import * as buildingMapService from '../domain/buildingMapService.js';
import { ObjectId } from 'mongodb';



export const getBuildingMapData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const buildingId = req.params.buildingId;
        const buildingMapData = await buildingMapService.getBuildingMapData(buildingId);
        if(buildingMapData){
            const data = buildingMapData.toJSON();
            data['id'] = buildingMapData._id.toString();
            res.status(200).json({data:data});
            return
        }else{
            res.sendStatus(404);
        }
        
    }catch(error){
        console.error(error);
        next(error);
    }       

}

