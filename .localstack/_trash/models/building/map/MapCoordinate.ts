import { Schema } from 'mongoose';
import { MapCoordinates } from '../../../interfaces/MapCoordinates';

const mapCoordinateSchema = new Schema<MapCoordinates>({
   x:{
    type:Number,
    require:true
   },
   y:{
    type:Number,
    require:true,
   },
   floor:{
    type:Number,
    require:true
   }
}, { 
    _id:false,
    timestamps: true,
    autoCreate: false,
});

export default mapCoordinateSchema;