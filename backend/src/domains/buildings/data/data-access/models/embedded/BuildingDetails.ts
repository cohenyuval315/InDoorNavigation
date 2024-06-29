
import { Schema } from 'mongoose';
import addressSchema from './Address.js';
import { BuildingType } from '@/common/enums/BuildingType.js';

const buildingDetailsSchema = new Schema({
    title:{
        type:String,
        require:true
    },    
    description:{
        type:String,
        require:false
    }, 
    buildingType:{
        type:String,
        enum:Object.values(BuildingType),
        require:false
    },
    address: {
        type:addressSchema,
        require:false
    },
    owner:{
        type:String,
        require:false
    },
    openingHours:{
        type:Object,
        require:false
    },
    websiteLink:{
        type:String,
        require:false
    },
    phoneNumbers:{
        type:Object,
        require:false
    },
    buildingOpeningDate:{
        type:Date,
        require:false
    },
    accessibility:{
        type:Object,
        require:false
    },
    activities:{
        type:Object,
        require:false
    },


    
    
    storageImageKey:{
        type:String,
        require:false
    },
    imageUri: {
        type:String,
        require:false
    },


}, { 
    _id:false,
    timestamps: true,
    autoCreate: false,
});
export default buildingDetailsSchema;


