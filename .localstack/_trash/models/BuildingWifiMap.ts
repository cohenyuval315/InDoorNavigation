import { Schema, model } from 'mongoose';
const buildingWifiMapData = new Schema({    
    buildingId: {
        type: Schema.Types.ObjectId, 
        require:true
    },  
    data:{
        type:Schema.Types.Array, 
        require:true
    }
}, { 
    timestamps: true,
    autoCreate: true,
});

const BuildingWifiMap = model('BuildingWifiMap', buildingWifiMapData);
export default BuildingWifiMap;
