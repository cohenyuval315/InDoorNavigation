import mongoose from 'mongoose';
import BuildingGraphMap from "../data-access/index.js";


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

export const getBuildingGraphMapData = async (buildingId:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    const mapData = await BuildingGraphMap.findOne({ buildingId: id });
    return mapData;
}

