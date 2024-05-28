
import { Schema } from 'mongoose';
import { POIType } from '../../../constants/constants';


const POIDetailsSchema = new Schema({
    title:{
        type:String,
        require:true
    },    
    description:{
        type:String,
        require:true
    }, 
    POIType:{
        type:String,
        enum:Object.values(POIType),
        require:true
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
    POIOpeningDate:{
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
export default POIDetailsSchema;



