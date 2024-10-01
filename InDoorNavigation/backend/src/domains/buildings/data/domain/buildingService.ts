import { BuildingStatus } from '../../../../common/enums/BuildingStatus.js';
import  BuildingData  from '../data-access/index.js';
import mongoose from 'mongoose';




export const getBuildingData = async (buildingId:string) => {
    const building = await BuildingData.findOne({_id:buildingId});
    return building;
}

export const createBuildingData = async (buildingId:string,buildingData:any,override:boolean) => {
    try {
        const id = new mongoose.Types.ObjectId(buildingId);
        buildingData._id = id;
        const buildingDataSchema = new BuildingData(buildingData);

        const validationError = buildingDataSchema.validateSync();
        if (validationError) {
            console.error(`Validation error: ${validationError.message}`);
            return;
        }
        
        const existingBuilding = await BuildingData.findById(id);
        if (existingBuilding) {
            console.log(`Building with name ${existingBuilding.details.title} already exists.`);
            if (override){
                console.log(`Overide - Deleteing Building with name ${existingBuilding.details.title}.`);
                const res = await BuildingData.findByIdAndDelete(id);
                if (res) {
                    console.log("success deleting building data");
                } else {
                    console.log(`failure deleting building data.`);
                }                
            }else{
                return;
            }
        }else{
            console.log(`Building with name ${buildingData.details.title} does not exist.`);
        }

        await buildingDataSchema.save()
        console.log(`Building with name ${buildingDataSchema.details.title} created successfully.`);
        return buildingId

    } catch (error) {
        console.error(`Error seeding building: ${error.message}`);
    }
}

export const updateBuildingData = async (buildingId:string,buildingData:any) => {
    const buildingDataSchema = new BuildingData(buildingData);
    const validationError = buildingDataSchema.validateSync();
    if (validationError) {
        console.error(`Validation error: ${validationError.message}`);
        return;
    }

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






export const getAllBuildingsData = async () => {
    return await BuildingData.find({});
}

export const getBuildingsData = async () => {
    return BuildingData.find({status:BuildingStatus.PRODUCTION});
}

export const deleteAllBuildingsData = async () => {
    const response = await BuildingData.deleteMany({});
    return response.deletedCount;
}





