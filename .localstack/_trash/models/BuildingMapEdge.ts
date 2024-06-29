import { Schema, model } from 'mongoose';
import { Direction, SegmentPathType, WaypointFacilityType, WaypointPathType } from '../constants/constants';
import mapCoordinateSchema from './building/map/MapCoordinate';
import MapEdge from '../core/path-finding/MapEdge';

const buildingMapEdgeSchema = new Schema<MapEdge>({
    id:{
        type: Schema.Types.String, 
        require:true
    },
    title:{
        type: Schema.Types.String, 
        require:true
    },
    nodeA:{
        type: Schema.Types.String, 
        require:true
    },
    nodeB:{
        type: Schema.Types.String, 
        require:true
    },
    pathType:{
        type: String,
        enum: Object.values(SegmentPathType),
        require:true,
    },
    weight:{
        type: Schema.Types.Number,
        require:true,
    },
    isAvailable:{
        type: Schema.Types.Boolean, 
        require:true,
        default:true
    },
}, { 
    _id:false,
    timestamps: true,
    autoCreate: true,
});


export default buildingMapEdgeSchema;

