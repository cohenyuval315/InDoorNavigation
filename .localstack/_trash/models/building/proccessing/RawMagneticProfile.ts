import { Schema } from 'mongoose';
import orientationSchema from '../navigation/Orientation';
import mapCoordinateSchema from '../map/MapCoordinate';
import magneticFieldSchema from '../navigation/MagneticField';


const rawMagneticProfileSchema = new Schema({
    mapCoordinate:{
        type:mapCoordinateSchema,
        require:true
    },
    deviceOrientation:{
        type:orientationSchema,
        require:true
    },
    declination:{ // (angle between magnetic north and true north)
        type:Number,
        require:false,
    },
    magneticField:{
        type:magneticFieldSchema,
        require:true
    }
}, { 
    timestamps: true,
    autoCreate: false,
});

export default rawMagneticProfileSchema;