import { Schema, model } from 'mongoose';
import POISchema from './building/map/POI';
import { BuildingStatus } from '../constants/constants';
import buildingPOIFloorMapSchema from './BuildingPOIFloorMap';
import buildingMapCardinalDirectionsSchema from './BuildingMapCardinalDirections';
import buildingMapFloorSchema from './BuildingMapFloor';


const buildingMapDataSchema = new Schema({
    buildingId: {
        type: Schema.Types.ObjectId, 
        require:true
    },
    minFloor: {
        type: Number,
        require: true
    },
    maxFloor: {
        type: Number,
        require: true
    },
    numFloors: {
        type: Number,
        require: true
    },
    unitInMeters:{
        type:Number,
        require:true,
    },
    cardinalDirections:{
        type:buildingMapCardinalDirectionsSchema,
        require:true
    },
    status: {
        type: String, 
        enum: Object.values(BuildingStatus),
        require:true,
        default:BuildingStatus.DEVELOPMENT
    },
    POIsMaps:{
        type:[buildingPOIFloorMapSchema],
        // validate: {
        //     validator: function(v:any) {
        //         return v.length >= 1;
        //     },
        //     message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        // }    
    },
    POIsColorMap:{
        type:Object,
        require:true
    },
    mapImageStorageKey:{
        type: String, 
        require:false
    },
    
    POIs:{
        type: [POISchema], 
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }    
    },
    mapFloors:{
        type: [buildingMapFloorSchema],
        required: true,
        validate: {
            validator: function (value) {
                const { numFloors } = this;
                if (value.length !== numFloors){
                    return false;
                }
                return true;
            },
            message: props => `${props.path} must have same number of floors`
        }        
    }



}, { 
    timestamps: true,
    autoCreate: true,
});

const BuildingMapData = model('BuildingMapData', buildingMapDataSchema);
export default BuildingMapData;

