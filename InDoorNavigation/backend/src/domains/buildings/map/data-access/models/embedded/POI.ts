import { Schema } from 'mongoose';
import POIDetailsSchema from './POIDetails.js';
import { MapPOI } from '../../../../../../common/interfaces/MapPOI.js';
import mapCoordinateSchema from '../../../../embedded/MapCoordinate.js';

const POISchema = new Schema<MapPOI>({
    id:{
        type:String,
        require:true
    },
    mapArea:{
        type:[mapCoordinateSchema],
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }        
    },
    center:{
        type:mapCoordinateSchema,
        require:true,
    },
    isAvailable:{
        type:Boolean,
        require:true,
        default:true
    },
    floor:{
        type:Number,
        require:true,
    },
    isEmployeeOnly:{
        type:Boolean,
        default:false,
        require:false
    },
    details:{
        type:POIDetailsSchema,
        require:true
    }
}, { 
    _id:false,
    timestamps: true,
    autoCreate: false,
});
export default POISchema;