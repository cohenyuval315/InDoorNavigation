import { Schema } from 'mongoose';
import mapCoordinateSchema from '../map/MapCoordinate';
import orientationSchema from '../navigation/Orientation';

const rawRSSSchema = new Schema({
    buildingId: {
        type: Schema.Types.ObjectId, 
        require:true
    },    
    deviceOrientation:{
        type:orientationSchema,
        require:true
    },
    deviceMapCoordinate:{
        type:mapCoordinateSchema,
        require:true
    },    
    SSID:{
        type:String,
        require:true
    },
    BSSID:{
        type:String,
        require:true
    },
    RSS:{
        type:Number,
        require:true
    },
}, { 
    timestamps: true,
    autoCreate: false,
});

export default rawRSSSchema;