import { Schema } from 'mongoose';

const magneticFieldSchema = new Schema({
   x:{
    type:Number,
    require:true
   },
   y:{
    type:Number,
    require:true
   },
   z:{
    type:Number,
    require:true
   },
   intensity:{
    type:Number,
    require:true
   }
}, { 
    _id:false,
    timestamps: true,
    autoCreate: false,
});

export default magneticFieldSchema;