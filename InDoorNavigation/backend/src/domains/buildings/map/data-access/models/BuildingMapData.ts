import { Schema, model } from 'mongoose';
import POISchema from './embedded/POI.js';
import buildingPOIFloorMapSchema from './embedded/BuildingPOIFloorMap.js';
import buildingMapCardinalDirectionsSchema from './embedded/BuildingMapCardinalDirections.js';
import { BuildingStatus } from '../../../../../common/enums/BuildingStatus.js';
import buildingMapFloorSchema from '../../../embedded/BuildingMapFloor.js';


const buildingMapDataSchema = new Schema({
    buildingId: {
        type: Schema.Types.ObjectId, 
        require:true
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
                return true;
            },
            message: props => `${props.path} must have same number of floors`
        }        
    },
    mapHeading:{
        type:Number,
        validate: {
            validator: function (value) {
                if (value < 0){
                    return false;
                }
                if (value > 360){
                    return false;
                }
                return true;
            },
            message: props => `${props.path} map heading must be between 0 - 360`
        }   
    },
    scale:{
        type:Number,
        require:true,
    },
    zScale:{
        type:Number,
        require:true,
    },
    mapWidth:{
        type:Number,
        require:true,
    },
    mapHeight:{
        type:Number,
        require:true,
    }


}, { 
    timestamps: true,
    autoCreate: true,
});

const BuildingMapData = model('BuildingMapData', buildingMapDataSchema);
export default BuildingMapData;

