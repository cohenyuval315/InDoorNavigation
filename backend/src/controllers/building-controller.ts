import {Request,Response,NextFunction} from 'express'
import { BuildingStatus, CardinalDirection, Direction, POIType, SegmentPathType, WaypointFacilityType, WaypointPathType } from "../constants/constants";
import BuildingData from "../models/BuildingData";
import BuildingMapData from "../models/BuildingMapData";
import * as buildingsService from '../services/buildings-service';
import fs from 'fs/promises';
import path from 'path';
import {afekaBuildingData,afekaBuildingMapData,afekaAdminBuildingMapData} from "./afeka";
import BuildingDataBoundary from '../boundaries/building-data-boundary';


export const getAllBuildingsData = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildings = await buildingsService.getAllBuildingsData();
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

const __dirname = path.dirname(new URL(import.meta.url).pathname);
// doesnt handle building status check. assumes the id comes from client
export const getBuildingMapData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const buildingId = req.params.id;
        // const svgFileMinus1 = await fs.readFile(path.join(__dirname,'..','..','src','seeding','images', 'afeka_-1_.svg').slice(3), 'utf-8');
        // const svgFile0 = await fs.readFile(path.join(__dirname, '..','..','src','seeding','images', 'afeka_0_.svg').slice(3), 'utf-8');
        
        const buildingMapData = await buildingsService.getBuildingMapData(buildingId);
        const data = buildingMapData.toJSON();
        data['id'] = buildingMapData._id.toString();
        // const response = {
        //     floorsFiles:[
        //         {
        //             file:svgFileMinus1,
        //             floor:-1,
        //             width: 1326,
        //             height: 1207
        //         },
        //         {
        //             file:svgFile0,
        //             floor:0,
        //             width: 1326,
        //             height: 1207
        //         }
        //     ],
        //     data:afekaBuildingMapData
        // }
        return res.status(200).json({data:data});
    }catch(error){
        console.error(error);
        next(error);
    }
    
    // try{
    //     const building = await BuildingMapData.findById(buildingId);
    //     if (!building) {
    //         const error = new NotFoundError("Building not found");
    //         return next(error);
    //         return res.status(404).json({ error: "Building not found" });
    //     }        
    // }catch(err){
    //     console.error("Error occurred while querying buildings maps:", err);
    //     return res.status(500).json({ error: "Internal server error" });
    // }       
    // try{
    //     const mapImage = 'map'; // TODO
    //     return res.status(200).json({building,mapImage});      
    // }catch(err){
    //     console.error("Error occurred getting map:", err);
    //     return res.status(500).json({ error: "Internal server error" });
    // }           

}


export const getAdminBuildingMapData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const buildingId = req.params.buildingId;
        const graphMap = await buildingsService.getBuildingGraphMapData(buildingId);
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

