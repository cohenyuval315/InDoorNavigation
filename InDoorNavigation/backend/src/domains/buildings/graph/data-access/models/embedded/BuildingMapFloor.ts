import { Schema } from 'mongoose';
import { MapFloor } from '../../../../../../common/interfaces/MapFloor.js';

const buildingMapFloorSchema = new Schema<MapFloor>({    
    map: {
        type: String, 
        require:false
    },  
    floor:{
        type:Number, 
        require:true
    },
    width:{
        type:Number, 
        require:true
    },
    height:{
        type:Number, 
        require:true
    },
    floorHeight:{
        type:Number,
        require:true

    }
     
}, { 
    _id:false,
    timestamps: true,
    autoCreate: true,
});

export default buildingMapFloorSchema;
