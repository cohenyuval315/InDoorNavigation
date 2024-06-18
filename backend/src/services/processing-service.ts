import RouteProcessingDataSchema from "../models/RouteProcessingData"
import BuildingProcessingMapData from "../models/BuildingProcessingMapData";


// await BuildingProcessingMapData.deleteMany({})
// const items = await BuildingProcessingMapData.find({})
// console.log(items)


export const uploadRoute = async (data:any) => {
    const response = await RouteProcessingDataSchema.insertMany([data])
    return response;
}
export const getAllRoutes = async (buildingId:string) => {
    const routes = await RouteProcessingDataSchema.find({
        buildingId,
    })
    return routes;
}

export const getRouteByName = async (buildingId:string,routeName:string) => {
    const route = await RouteProcessingDataSchema.findOne({
        buildingId,
        routeName
    }) 
    return route;
}

export const uploadProcessingMap = async (data:any) => {
    return await BuildingProcessingMapData.insertMany([data]);
}

export const getAllProcessingMaps = async (buildingId:string) => {
    return await BuildingProcessingMapData.find({
        buildingId
    });

}


export const getProcessingMap = async (buildingId:string,version:string) => {
 
    const processingMap = await BuildingProcessingMapData.findOne({
        buildingId,
        version
    })
    return processingMap;
}


export const getAllRoutesTitles = async (buildingId:string) => {
    const routes = await  RouteProcessingDataSchema.find({buildingId})
    return routes.map((route) => route.routeName)
}


