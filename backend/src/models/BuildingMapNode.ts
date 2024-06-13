import { Schema, model } from 'mongoose';
import { Direction, WaypointFacilityType, WaypointPathType } from '../constants/constants';
import mapCoordinateSchema from './building/map/MapCoordinate';
import MapNode from '../core/path-finding/MapNode';

const buildingMapNodeSchema = new Schema<MapNode>({
    id:{
        type: Schema.Types.String, 
        require:true
    },
    title:{
        type: Schema.Types.String, 
        require:true
    },
    pathType:{
        type: String,
        enum: Object.values(WaypointPathType),
        require:true,
    },
    facilityType:{
        type: String,
        enum: Object.values(WaypointFacilityType),
        require:true,
    },
    POIId:{
        type: String,
        require:false,
    },
    isAvailable:{
        type: Schema.Types.Boolean, 
        require:true,
        default:true
    },
    availableHeadings:{
        type: [String],
        enum: Object.values(Direction),
        require:true,
    },
    mapCoordinates: {
        type: mapCoordinateSchema, 
        require:true
    }
}, { 
    _id:false,
    timestamps: true,
    autoCreate: true,
});


export default buildingMapNodeSchema;

