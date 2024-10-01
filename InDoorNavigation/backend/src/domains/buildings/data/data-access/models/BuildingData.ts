import { Schema, model } from 'mongoose';
import {
    buildingDetailsSchema,
    buildingEntranceSchema,
    geoCoordinateSchema
} from './embedded/index.js'
import { BuildingStatus } from '../../../../../common/enums/BuildingStatus.js';


const buildingDataSchema = new Schema({   
    _id: {
        type: Schema.Types.ObjectId, 
        require:true
    },  
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
        type:[buildingEntranceSchema],
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
