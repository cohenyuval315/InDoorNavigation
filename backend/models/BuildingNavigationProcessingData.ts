import { Schema, model } from 'mongoose';
import routeSchema from './building/proccessing/Route';
import rawRSSSchema from './building/proccessing/RawRSS';
import rawMagneticProfileSchema from './building/proccessing/RawMagneticProfile';

const buildingNavigationProcessingDataSchema = new Schema({
    smartphoneId:{
        type:Schema.Types.ObjectId,
        require:true,
    },      
    testRoute:{
        type:routeSchema,
        require:true,        
    },
    rawRSSs:{
        type:[rawRSSSchema],
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }       
    },
    rawMagneticProfiles:{
        type:[rawMagneticProfileSchema],
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }        
    },    

}, { 
    timestamps: true,
    autoCreate: true,
});


const BuildingNavigationProcessingData = model('BuildingNavigationProcessingData', buildingNavigationProcessingDataSchema);
export default BuildingNavigationProcessingData;
