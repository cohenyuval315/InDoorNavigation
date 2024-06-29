
import mongoose from 'mongoose';
import BuildingMagneticMap from '../data-access/index.js';

export const getBuildingMagneticMapData = async (buildingId:string) => {
    const mapData = await BuildingMagneticMap.findOne({ buildingId: buildingId });
    return mapData;
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



