import { Schema } from 'mongoose';
import { CardinalDirection } from '../../../constants/constants';

const orientationSchema = new Schema({
   yaw:{
    type:Number,
    require:true
   },
   pitch:{
    type:Number,
    require:true
   },
   roll:{
    type:Number,
    require:true
   },
   cardinalDirection:{
    type:String,
    enum:Object.values(CardinalDirection),
    require:true
   }
}, { 
    _id:false,
    timestamps: true,
    autoCreate: false,
});

export default orientationSchema;