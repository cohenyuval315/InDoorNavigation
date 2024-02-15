
import { Schema } from 'mongoose';
import { BuildingType } from '../../../constants/constants';
import addressSchema from './Address';

const buildingDetailsSchema = new Schema({
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
    buildingType:{
        type:String,
        enum:Object.values(BuildingType),
        require:true
    },
    address: {
        type:addressSchema,
        require:true
    },
    owner:{
        type:String,
        require:false
    },
    openingHours:{
        type:String,
        require:false
    },
    closingHours:{
        type:String,
        require:false
    },
    websiteLink:{
        type:String,
        require:false
    },
    phonenumbers:{
        type:String,
        require:false
    },
    buildingOpeningDate:{
        type:Date,
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
    // _id:false,
    timestamps: true,
    autoCreate: false,
});
export default buildingDetailsSchema;


