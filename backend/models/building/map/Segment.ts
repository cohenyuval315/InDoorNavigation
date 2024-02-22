import { Schema } from 'mongoose';
import { SegmentPathType } from '../../../constants/constants';
import headingSchema from '../navigation/Heading';
import mapCoordinateSchema from './MapCoordinate';

const segmentSchema = new Schema({
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
    enum:Object.values(SegmentPathType),
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
    visualMapArea:{
        type:[mapCoordinateSchema],
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 3;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }    
    },
    sourceWaypoint:{
        type: Schema.Types.ObjectId, 
        require:true 
    },
    targetWaypoint:{
        type: Schema.Types.ObjectId, 
        require:true
    }    
   
}, { 
    timestamps: true,
    autoCreate: false,
});

export default segmentSchema;