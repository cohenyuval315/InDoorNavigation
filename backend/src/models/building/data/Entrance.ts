import { Schema } from 'mongoose';
import geoCoordinateSchema from './GeoCoordinate';

const entranceSchema = new Schema({
    // buildingId: {
    //     type: Schema.Types.ObjectId, 
    //     require:true
    // },
    title:{
        type:String,
        require:true
    },    
    description:{
        type:String,
        require:true
    }, 
    isMain:{
        type:Boolean,
        default:false
    },
    isEmployeeOnly:{
        type:Boolean,
        default:false
    },               
    isAvailable:{
        type:Boolean,
        default:true
    },
    geoTransitionArea: {
        type: [geoCoordinateSchema],
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }    
    },
    doorGeoCoordinate:{
        type: geoCoordinateSchema,
        require:true
    }     
}, { 
    _id:false,
    timestamps: true,
    autoCreate: false,
});
export default entranceSchema;