import { BuildingStatus } from "../constants/constants";
import BuildingData from "../models/BuildingData";
import BuildingMapData from "../models/BuildingMapData";
import * as Errors from '../exceptions'


export const getBuildingData = async (buildingId:string) => {
    const building = await BuildingData.findOne({_id:buildingId});
    if (!building){
        return new Errors.NotFoundError('building not found');
    }
    return building;
}

export const getAllBuildingsData = async () => {
    return BuildingData.find({status:BuildingStatus.PRODUCTION});
}

export const getBuildingMapData = async (buildingId:string) => {
    const building = await BuildingData.findOne({ _id: buildingId, status: BuildingStatus.PRODUCTION});
    if (!building) {
        return new Errors.NotFoundError("");
    }
    const mapData = await BuildingMapData.findOne({ buildingId: buildingId });
    if(!mapData){
        return new Errors.NotFoundError("");
    }
    return mapData;
}


export const createBuildingData = async (buildingData) => {
    await BuildingData.validate(buildingData);
    const newBuildingData = await BuildingData.create(buildingData);
    return newBuildingData;
}

export const updateBuildingData = async (buildingId:string,buildingData) => {
    const response = await BuildingData.updateOne({_id:buildingId},buildingData);
    if(response.modifiedCount){
        console.error('failed to update?')    
    }
    const updatedBuilding = await getBuildingData(buildingId);
    if (!updatedBuilding){
        console.error('failed to update?') 
    }
    return updatedBuilding
}

export const deleteBuildingData = async (buildingId:string) => {
    const response = await BuildingData.deleteOne({_id:buildingId});
    return response.deletedCount;
}

export const deleteAllBuildingsData = async () => {
    const response = await BuildingData.deleteMany();
    return response.deletedCount;
}


export const createBuildingMapData = async (buildingMapData) => {
    const newBuildingMapData = await BuildingMapData.create(buildingMapData);
    return newBuildingMapData;
}

export const updateBuildingMapData = async (buildingId:string,buildingMapData) => {
    const building = await BuildingMapData.updateOne({ buildingId },buildingMapData);
    return building.modifiedCount;
}

export const deleteBuildingMapData = async (buildingId:string) => {
    const response = await BuildingMapData.deleteOne({ buildingId });
    return response.deletedCount;
}

export const deleteAllBuildingsMapsData = async () => {
    const response = await BuildingMapData.deleteMany();
    return response.deletedCount;
}
