import { Schema, model } from 'mongoose';
import geoCoordinateSchema from './building/data/GeoCoordinate';
import buildingDetailsSchema from './building/data/BuildingDetails';
import entranceSchema from './building/data/Entrance';
import { BuildingStatus } from '../constants/constants';

const buildingDataSchema = new Schema({    
    status: {
        type: String, 
        enum: Object.values(BuildingStatus),
        require:true,
        default:BuildingStatus.DEVELOPMENT
    },
    details:{
        type:buildingDetailsSchema,
        require:true
    },
    geoArea: {
        type: [geoCoordinateSchema],
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }    
    },
    entrances:{
        type:[entranceSchema],
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }          
    }
   
}, { 
    timestamps: true,
    autoCreate: true,
});

const BuildingData = model('BuildingData', buildingDataSchema);
export default BuildingData;
