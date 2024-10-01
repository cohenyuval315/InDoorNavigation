import { GeoCoordinates } from '../../../../../../common/interfaces/GeoCoordinates.js';
import { Schema } from 'mongoose';

const geoCoordinateSchema = new Schema<GeoCoordinates>({
    latitude: {
        type: Number,
        require:true
    },   
    longitude: {
        type: Number, 
        require:true
    },
}, { 
    _id:false,
    timestamps: false,
    autoCreate: false,
});
export default geoCoordinateSchema;