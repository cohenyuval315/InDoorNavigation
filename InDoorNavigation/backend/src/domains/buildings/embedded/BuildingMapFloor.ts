import { MapFloor } from '../../../common/interfaces/MapFloor.js';
import { Schema, model } from 'mongoose';

const buildingMapFloorSchema = new Schema<MapFloor>({    
    map: {
        type: String, 
        require:false
    },  
    floor:{
        type:Number, 
        require:true
    },
    floorHeight:{
        type:Number,
        require:true
    },
    altitude:{
        type:Number,
        require:true
    }
     
}, { 
    _id:false,
    timestamps: true,
    autoCreate: true,
});

export default buildingMapFloorSchema;
