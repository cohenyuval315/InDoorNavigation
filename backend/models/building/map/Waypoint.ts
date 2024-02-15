import { Schema } from 'mongoose';
import { WaypointFacilityType, WaypointPathType } from '../../../constants/constants';
import headingSchema from '../navigation/Heading';
import mapCoordinateSchema from './MapCoordinate';

const waypointSchema = new Schema({
   title:{
    type:String,
    require:true
   },
   weight:{
    type:Number,
    require:true,
   },
   pathType:{
    type:String,
    enum:Object.values(WaypointPathType),
    require:true
   },
   facilityType:{
    type:String,
    enum:Object.values(WaypointFacilityType),
    require:true
   },   
   isAvailable:{
    type:Boolean,
    default:true,
    require:true
   },
    availableHeadings:{
        type:[headingSchema],
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }    
    },

    mapCoordinates:{
        type:mapCoordinateSchema,
        require:true,      
    }
   
}, { 
    timestamps: true,
    autoCreate: false,
});

export default waypointSchema;