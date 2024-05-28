import { Schema } from 'mongoose';

const RSSSchema = new Schema({
   SSID:{
    type:String,
    require:true
   },
   BSSID:{
    type:String,
    require:true
   },
   RSS:{
    type:Number,
    require:true
   },
}, { 
    timestamps: true,
    autoCreate: false,
});

export default RSSSchema;