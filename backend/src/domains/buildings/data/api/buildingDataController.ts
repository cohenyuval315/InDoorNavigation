import {Request,Response,NextFunction} from 'express'
import * as buildingService  from '../domain/buildingService.js'

export const getBuildingData  = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildingId = req.params.buildingId
        const building = await buildingService.getBuildingData(buildingId)
        if (building){
            res.status(200).json({ data : building})
            return
        }else{
            res.status(404).json({ message:"no buildings found"});
            return
        }
    }catch(error){
        next(error);
    }
}


export const postBuildingData = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const {
            buildingId,
            buildingData,
            override
        } = req.body

        const newBuildingId = await buildingService.createBuildingData(
            buildingId,
            buildingData,
            override
        );
        if(newBuildingId){
            let msg = null
            if (override){
                msg = "successfuly recreated building"
            }else{
                msg = "successfuly created building"
            }
            res.status(200).json({message:msg})
        }else{
            res.status(500).json({message:"interval"})
        }
    }catch(error){
        next(error);
    }
}


export const putBuildingData   = async (req:Request,res:Response,next:NextFunction) => {
    try {
        res.status(200).json({})
    }catch(error){
        next(error)
    }
    
}

export const deleteBuildingData   = async (req:Request,res:Response,next:NextFunction) => {
    try {
        res.status(200).json({})
    }catch(error){
        next(error)
    }
}






export const getAllBuildingsData = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildings = await buildingService.getAllBuildingsData();
        if (buildings && buildings.length > 0) {
            // const data = buildings.map((building) => new BuildingDataBoundary(building))
            // return res.status(200).json({ data: data });
            const data = buildings.map((building) => {
                const b = building.toJSON();
                b['id'] = building._id.toString();
                return b
            });
            return res.status(200).json({ data: data });
        } else {
            return res.status(404).json({ message:"no buildings found"});
        }        
    }catch(error){
        next(error);
    }
}


export const deleteAllBuildingsData  = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const response = await buildingService.deleteAllBuildingsData()
        if (response){
            res.status(200).json({message:"success"});
        }else{
            res.status(500).json({});
        }
    }catch(error){
        next(error);
    }
    
}