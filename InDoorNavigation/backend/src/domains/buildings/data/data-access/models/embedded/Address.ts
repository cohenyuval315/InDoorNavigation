import { Schema } from 'mongoose';
import { BuildingAddress } from '../../../../../../common/interfaces/BuildingAddress.js'; 

const addressSchema = new Schema<BuildingAddress>({
    country:{
        type:String,
        require:true
    },    
    state:{
        type:String,
        require:true
    }, 
    city:{
        type:String,
        require:true
    }, 
    street:{
        type:String,
        require:true
    },
    streetNumber:{
        type:String,
        require:true
    },
    postalCode:{
        type:String,
        require:false
    },     
}, { 
    _id:false,
    timestamps: false,
    autoCreate: false,
});

export default addressSchema;