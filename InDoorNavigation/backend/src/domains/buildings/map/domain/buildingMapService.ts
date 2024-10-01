import BuildingMapData from '../data-access/index.js';
import mongoose from 'mongoose';

export const getBuildingMapData = async (buildingId:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    const mapData = await BuildingMapData.findOne({ buildingId: id });
    return mapData;
}


export const updateBuildingMapData = async (buildingId:string, buildingMapData:any) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    const building = await BuildingMapData.updateOne({ id },buildingMapData);
    return building.modifiedCount;
}

export const deleteBuildingMapData = async (buildingId:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    const response = await BuildingMapData.deleteOne({ buildingId:id });
    return response.deletedCount;
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

        await buildingMapDataSchema.save()
        console.log(`Building Map with building id ${buildingMapDataSchema.buildingId} created successfully.`);

    } catch (error) {
        console.error(`Error seeding building map: ${error.message}`);
    }
}



export const deleteAllBuildingsMapsData = async () => {
    return await BuildingMapData.deleteMany({})
}