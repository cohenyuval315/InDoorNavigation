import { Schema } from 'mongoose';
import mapCoordinateSchema from '../map/MapCoordinate';
import rawRSSSchema from './RawRSS';
import magneticProfileSchema from '../navigation/MagneticProfile';
import headingSchema from '../navigation/Heading';
import orientationSchema from '../navigation/Orientation';

const checkpointSchema = new Schema({
    mapCoordinate:{
        type:mapCoordinateSchema,
        require:true
    },
    deviceOrientation:{
        type:orientationSchema,
        require:true
    },
    heading:{
        type:headingSchema,
        require:true
    },
    signals:{
        type:[rawRSSSchema],
        require:true,
    },
    magneticProfile:{
        type:magneticProfileSchema,
        require:true
    }
}, { 
    timestamps: true,
    autoCreate: false,
});

export default checkpointSchema;