import { Schema } from 'mongoose';
import mapCoordinateSchema from '../map/MapCoordinate';
import RSSSchema from './RSS';

const WIFIFingerprintSchema = new Schema({
   signals:{
        type:[RSSSchema],
        require:true
   },
   mapCoordinate:{
    type:mapCoordinateSchema,
    require:true
   }
}, { 
    timestamps: true,
    autoCreate: false,
});

export default WIFIFingerprintSchema;