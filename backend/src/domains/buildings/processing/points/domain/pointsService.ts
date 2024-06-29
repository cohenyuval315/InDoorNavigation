import mongoose from "mongoose";
import BuildingProcessingMapData from "../data-access/index.js";

export const getProcessingPoints = async (buildingId:string,version:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    const processingMap = await BuildingProcessingMapData.findOne({
        buildingId:id,
        version
    })
    return processingMap;
}

export const getAllBuildingProcessingPoints = async (buildingId:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    return await BuildingProcessingMapData.find({
        buildingId:id
    });
}


export const createProcessingPoints = async (data:any) => {
    const schema = new BuildingProcessingMapData(data)
    const validatorError = schema.validateSync()
    if(validatorError){

    }
    return await BuildingProcessingMapData.insertMany([data]);
}

export const deleteProcessingPoints = async (buildingId:string,version:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    return await BuildingProcessingMapData.deleteOne({
        buildingId:id,
        version,
    });
}

export const deleteAllProcessingPointsByBuildingId = async (buildingId:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    return await BuildingProcessingMapData.deleteMany({
        buildingId:id
    });
}

export const deleteAllProcessingPoints = async () => {
    return await BuildingProcessingMapData.deleteMany({});
}





