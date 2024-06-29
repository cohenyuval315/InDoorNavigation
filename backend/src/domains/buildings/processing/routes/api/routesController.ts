import {Request,Response,NextFunction} from 'express'
import * as routesService from '../domain/routesService.js';



export const postRoute = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildingId = req.params.buildingId;
        const body = req.body
        const data = body.data;
        const routeName = data.routeName;
        const existingRoute = await routesService.getRouteByName(buildingId,routeName)
        if (existingRoute){
            res.status(409).send('route exists')
            return;
        }

        const response = await routesService.createRoute(data);

        const route = await routesService.getRouteByName(buildingId,routeName)

        if (route){
            res.status(201).json({ message: 'Route uploaded successfully' });
        }else{
            res.status(500).json({ message: 'internal server error' });
        }
        
    }catch(error){
        console.log(error);
        next(error);
    }
}

export const getAllRoutes = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildingId = req.params.buildingId;
        const routes = await routesService.getAllRoutes(buildingId)
        res.status(200).json({ data: routes });
    }catch(error){
        next(error);
    }
}    

export const getAllRoutesTitles = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildingId = req.params.buildingId;
        const routesTitles = await routesService.getAllRoutesTitles(buildingId)
        res.status(200).json({ data: routesTitles });
    }catch(error){
        next(error);
    }
}    

export const getRouteByName = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildingId = req.params.buildingId;
        const routeName = req.params.routeName;
        
        const route = await routesService.getRouteByName(buildingId,routeName)

        if(route){
            res.status(200).json({ data: route });
        }else{
            res.status(404).json({ message: 'Route not found' });
        }
    }catch(error){
        next(error);
    }
}

export const deleteBuildingRouteByName = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildingId = req.params.buildingId;
        const routeName = req.params.routeName;
        const response = await routesService.deleteBuildingRouteByName(buildingId,routeName)
        if(response){
            res.status(200).json({ message: "success" });
        }else{
            res.status(404).json({ message: 'fail' });
        }
    }catch(error){
        next(error);
    }
}


export const deleteBuildingRoutes = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildingId = req.params.buildingId;
        const response = await routesService.deleteBuildingRoutes(buildingId)
        if(response){
            res.status(200).json({ message: "success" });
        }else{
            res.status(404).json({ message: 'fail' });
        }
    }catch(error){
        next(error);
    }
}

export const deleteAllRoutes = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const response = await routesService.deleteAllRoutes();
        if(response){
            res.status(200).json({ message: "success" });
        }else{
            res.status(404).json({ message: 'fail' });
        }
    }catch(error){
        next(error);
    }
}
