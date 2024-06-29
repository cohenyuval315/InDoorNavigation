import mongoose from "mongoose";
import RouteProcessingData from "../data-access/index.js";


export const createRoute = async (data:any) => {
    const response = await RouteProcessingData.insertMany([data])
    return response;
}
export const getAllRoutes = async (buildingId:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    const routes = await RouteProcessingData.find({
        buildingId:id,
    })
    return routes;
}

export const getAllRoutesTitles = async (buildingId:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    const routes = await  RouteProcessingData.find({buildingId:id})
    return routes.map((route) => route.routeName)
}


export const getRouteByName = async (buildingId:string,routeName:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    const route = await RouteProcessingData.findOne({
        buildingId:id,
        routeName
    }) 
    return route;
}


export const deleteBuildingRouteByName = async (buildingId:string,routeName:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    const route = await RouteProcessingData.deleteOne({
        buildingId:id,
        routeName
    }) 
    return route;
}

export const deleteBuildingRoutes = async (buildingId:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    return await RouteProcessingData.deleteMany({
        buildingId:id,
    }) 
}

export const deleteAllRoutes = async () => {
    return await RouteProcessingData.deleteMany({}) 
}


