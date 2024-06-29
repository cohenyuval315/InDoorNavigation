import { Schema, model } from 'mongoose';
const buildingMagneticMapData = new Schema({    
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

const BuildingMagneticMap = model('BuildingMagneticMapData', buildingMagneticMapData);
export default BuildingMagneticMap;
