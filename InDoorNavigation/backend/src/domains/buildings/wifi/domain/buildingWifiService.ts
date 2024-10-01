import mongoose from 'mongoose';
import BuildingWifiMap from '../data-access/index.js';



export const getBuildingWifiMapData = async (buildingId:string) => {
    const id = new mongoose.Types.ObjectId(buildingId);
    const mapData = await BuildingWifiMap.findOne({ buildingId: id });
    return mapData;
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




