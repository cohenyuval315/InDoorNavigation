import { Schema, model } from 'mongoose';


const buildingProcessingMapData = new Schema({
    buildingId:{
        type: Schema.Types.String, 
        require:true
    },
    version:{
        type: Schema.Types.String, 
        require:true
    },
    points : {
        type: Schema.Types.Array, 
        require:true
    }


}, { 
    timestamps: true,
    autoCreate: true,
});


const BuildingProcessingMapData = model('BuildingProcessingMapData', buildingProcessingMapData);
export default BuildingProcessingMapData;
