import {Request,Response,NextFunction} from 'express'
import * as buildingGraphServices from '../domain/buildingGraphService.js';

export  const getBuildingGraphData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const buildingId = req.params.buildingId;
        const graphMap = await buildingGraphServices.getBuildingGraphMapData(buildingId);
        if(graphMap){
            const data = graphMap.toJSON();
            data['id'] = graphMap._id.toString();            
            return res.status(200).json({data:data});
        }else{
            return res.status(404).json({message: "building not found"});
        }
        
    }catch(error){
        console.error(error);
        next(error);
    }
               
}