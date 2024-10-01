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

export const getBuildingTiles = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildingId = req.params.buildingId;
        const zoom = req.params.zoom;
        const x = req.params.x;
        const y = req.params.y;
        const z = req.params.z;
        // storages services

        // stroage s3 

    }catch (error){
        next(error);
    }
    
}

