import { MapCoordinates } from '@/common/interfaces/MapCoordinates';
import { Schema } from 'mongoose';

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