import {Request,Response,NextFunction} from 'express'
import * as pointsService from '../domain/pointsService.js';

export const getProcessingPoints = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildingId = req.params.buildingId;
        const version = req.params.version;
        const pointsSnapshot = await pointsService.getProcessingPoints(buildingId,version);
        if(pointsSnapshot){
            res.status(200).json({ data: pointsSnapshot });
        }else{
            res.status(404).json({ message: 'points not found' });
        }
    }catch(error){
        next(error);
    }
}


export const getAllBuildingProcessingPoints  = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildingId = req.params.buildingId;
        const processingData = await pointsService.getAllBuildingProcessingPoints(buildingId)
        if (processingData){
            res.status(200).json({ data: processingData });
        }else{
            res.status(404).json({ error: "none" });
        }
        
    }catch(error){
        next(error);
    }
}


export const postProcessingPoints = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const body = req.body
        const data = body.data;
        const  {
            buildingId,
            version
        } = data;
        const processingMap = await pointsService.getProcessingPoints(buildingId,version)
        if (processingMap){
            res.status(409).json({ message: 'procesisng map exists already' });
            return;
        }
        const response = await pointsService.createProcessingPoints(data);
        const pointsSnapshot = await pointsService.getProcessingPoints(buildingId,version)
        if (pointsSnapshot){
            res.status(201).json({ message: 'map uploaded successfully' });
        }else{
            res.status(500).json({ message: 'internal server error' });
        }
        
    }catch(error){
        console.log(error)
        next(error);
    }
}



export const deleteProcessingPoints = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildingId = req.params.buildingId;
        const version = req.params.version;
        const response = await pointsService.deleteProcessingPoints(buildingId,version)
        if(response){
            res.status(200).json({ message: "success" });
        }else{
            res.status(500).json({ message: 'fail' });
        }
    }catch(error){
        next(error);
    }
}

export const deleteAllProcessingPointsByBuildingId = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildingId = req.params.buildingId;
        const response = await pointsService.deleteAllProcessingPointsByBuildingId(buildingId)
        if(response){
            res.status(200).json({ message: "success" });
        }else{
            res.status(500).json({ message: 'fail' });
        }
    }catch(error){
        next(error);
    }
}


export const deleteAllProcessingPoints = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const response = await pointsService.deleteAllProcessingPoints();
        if(response){
            res.status(200).json({ message:"success" });
        }else{
            res.status(500).json({ message: 'fail' });
        }
    }catch(error){
        next(error);
    }
}