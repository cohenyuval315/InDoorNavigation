import { BuildingStatus } from "../constants/constants";
import BuildingData from "../models/BuildingData";
import BuildingMapData from "../models/BuildingMapData";
import mongoose from 'mongoose';
import BuildingGraphMap from "../models/BuildingGraphMapData";
import BuildingWifiMap from "../models/BuildingWifiMap";
import BuildingMagneticMap from "../models/BuildingMagneticMap";
import { calculatePOIsCenterPoint } from "../utils/POI";
import { generatePOIsMaps } from "../utils/maps-generation";



export const getAllBuildingsData = async () => {
    // return BuildingData.find({status:BuildingStatus.PRODUCTION});
    return await BuildingData.find({});
}


export const updateBuildingData = async (buildingId:string,buildingData:any) => {
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




export const updateBuildingMapData = async (buildingId:string,buildingMapData:any) => {
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

    } catch (error) {
        console.error(`Error seeding building: ${error.message}`);
    }
}


export const createBuildingMapData = async (buildingId:string,buildingMapData:any,override:boolean) => {
    try {
        const buildingMapDataSchema = new BuildingMapData(buildingMapData);
        const validationError = buildingMapDataSchema.validateSync();
        if (validationError) {
            console.error(`Validation error: ${validationError.message}`);
            return;
        }
        const id = new mongoose.Types.ObjectId(buildingId);
        const existingBuildingMap = await BuildingMapData.findOne({
            buildingId:id
        });
        if (existingBuildingMap) {
            console.log(`Building Map with building id ${existingBuildingMap.buildingId} already has map.`);
            if (override){
                console.log(`Overide - deleting Building map with building id ${existingBuildingMap.buildingId}.`);
                const res = await BuildingMapData.findOneAndDelete({
                    buildingId:id
                })
                if (res) {
                    console.log("success deleting building map data");
                } else {
                    console.log(`failure deleting building map data.`);
                }
                
            }else{
                return null;
            }
        }else{
            console.log(`Building Map Doesnt Not Exists.`);
        }
        const pois = buildingMapDataSchema.get("POIs");
        const mapFloors = buildingMapDataSchema.get("mapFloors");
        
        const poisColorMap = buildingMapDataSchema.get("POIsColorMap");
        const normalPois = calculatePOIsCenterPoint(pois);
        const poisMaps = generatePOIsMaps(poisColorMap,pois,mapFloors);
        buildingMapDataSchema.set("POIs",normalPois);
        buildingMapDataSchema.set("POIsMaps",poisMaps);


        await buildingMapDataSchema.save()
        console.log(`Building Map with building id ${buildingMapDataSchema.buildingId} created successfully.`);

    } catch (error) {
        console.error(`Error seeding building map: ${error.message}`);
    }
}

export const createBuildingGraphMapData = async (buildingId:string,buildingGraphData:any,override:boolean) => {
    try {
        const buildingGraphMapSchema = new BuildingGraphMap(buildingGraphData);

        const validationError = buildingGraphMapSchema.validateSync();
        if (validationError) {
            console.error(`Validation error: ${validationError.message}`);
            return;
        }
        const id = new mongoose.Types.ObjectId(buildingId);
        const existingBuildingGraphMap = await BuildingGraphMap.findOne({
            buildingId:id
        });
        if (existingBuildingGraphMap) {
            console.log(`Building graph map with building id ${existingBuildingGraphMap.buildingId} already exists.`);
            if (override){
                console.log(`Overide - Deleting Building Graph Map with id ${existingBuildingGraphMap.buildingId}.`);
                const res = await BuildingGraphMap.findOneAndDelete({
                    buildingId:id
                })
                if (res) {
                    console.log("success deleting building graph map data");
                } else {
                    console.log(`failure deleting building graph map data.`);
                }
            }else{
                return null;
            }
        }else{
            console.log(`Building Graph Map Doesnt Not Exists.`);
        }

        await buildingGraphMapSchema.save()
        console.log(`Building graph map with building id ${buildingGraphMapSchema.buildingId} created successfully.`);

    } catch (error) {
        console.error(`Error seeding building graph map: ${error.message}`);
    }
}

export const createBuildingWifiMapData = async (buildingId:string,buildingWifiMapData:any,override:boolean) => {
    try {
        const buildingWifiMapSchema = new BuildingWifiMap(buildingWifiMapData);

        const validationError = buildingWifiMapSchema.validateSync();
        if (validationError) {
            console.error(`Validation error: ${validationError.message}`);
            return;
        }
        const id = new mongoose.Types.ObjectId(buildingId);
        const existingBuildingWifiMap = await BuildingWifiMap.findOne({
            buildingId:id
        });
        if (existingBuildingWifiMap) {
            console.log(`Building Wifi map with building id ${existingBuildingWifiMap.buildingId} already exists.`);
            if (override){
                console.log(`Overide - Deleting Building Wifi Map with building id ${existingBuildingWifiMap.buildingId}.`);
                const res = await BuildingWifiMap.findOneAndDelete({
                    buildingId:id
                })
                if (res) {
                    console.log("success deleting building wifi map data");
                } else {
                    console.log(`failure deleting building wifi map data.`);
                }
            }else{
                return null;
            }
        }else{
            console.log(`Building wifi Map Doesnt Not Exists.`);
        }

        await buildingWifiMapSchema.save()
        console.log(`Building wifi map with building id ${buildingWifiMapSchema.buildingId} created successfully.`);

    } catch (error) {
        console.error(`Error seeding building wifi map: ${error.message}`);
    }
}

export const createBuildingMagneticMapData = async (buildingId:string,buildingMagneticMapData:any,override:boolean) => {
    try {
        const buildingMagneticMapSchema = new BuildingMagneticMap(buildingMagneticMapData);

        const validationError = buildingMagneticMapSchema.validateSync();
        if (validationError) {
            console.error(`Validation error: ${validationError.message}`);
            return;
        }
        const id = new mongoose.Types.ObjectId(buildingId);
        const existingBuildingMagneticMap = await BuildingMagneticMap.findOne({
            buildingId:id
        });
        if (existingBuildingMagneticMap) {
            console.log(`Building magnetic map with building id ${existingBuildingMagneticMap.buildingId} already exists.`);
            if (override){
                console.log(`Overide - Deleting Building magnetic Map with building id ${existingBuildingMagneticMap.buildingId}.`);
                const res=  await BuildingMagneticMap.findOneAndDelete({
                    buildingId:id
                })
                if (res) {
                    console.log("success deleting building magnetic map data");
                } else {
                    console.log(`failure deleting building magnetic map data.`);
                }
            }else{
                return null;
            }
        }else{
            console.log(`Building magnetic Map Doesnt Not Exists.`);
        }

        await buildingMagneticMapSchema.save()
        console.log(`Building magnetic map with building id ${buildingMagneticMapSchema.buildingId} created successfully.`);

    } catch (error) {
        console.error(`Error seeding building magnetic map: ${error.message}`);
    }
}




export const getBuildingData = async (buildingId:string) => {
    const building = await BuildingData.findOne({_id:buildingId});
    return building;
}

export const getBuildingMapData = async (buildingId:string) => {
    const mapData = await BuildingMapData.findOne({ buildingId: buildingId });
    return mapData;
}

export const getBuildingGraphMapData = async (buildingId:string) => {
    const mapData = await BuildingGraphMap.findOne({ buildingId: buildingId });
    return mapData;
}

export const getBuildingWifiMapData = async (buildingId:string) => {
    const mapData = await BuildingWifiMap.findOne({ buildingId: buildingId });
    return mapData;
}

export const getBuildingMagneticMapData = async (buildingId:string) => {
    const mapData = await BuildingMagneticMap.findOne({ buildingId: buildingId });
    return mapData;
}
