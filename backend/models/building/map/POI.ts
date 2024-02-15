import { Schema } from 'mongoose';
import POIDetailsSchema from './POIDetails';
import mapCoordinateSchema from './MapCoordinate';

const POISchema = new Schema({
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
    isAvailable:{
        type:Boolean,
        require:true,
        default:true
    },
    floor:{
        type:Number,
        require:true,
        default:0,
    },
    isEmployeeOnly:{
        type:Boolean,
        default:false,
        require:false
    },
    POIDetails:{
        type:POIDetailsSchema,
        require:true
    }
}, { 
    timestamps: true,
    autoCreate: false,
});
export default POISchema;