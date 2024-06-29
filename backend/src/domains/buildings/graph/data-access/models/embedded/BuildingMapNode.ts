import { Schema } from 'mongoose';
import { MapNode } from '../../../../../../common/interfaces/MapNode.js';
import mapCoordinateSchema from '@/domains/buildings/embedded/MapCoordinate.js';
import { WaypointPathType } from '@/common/enums/WaypointPathType.js';
import { WaypointFacilityType } from '@/common/enums/WaypointFacilityType.js';
import { Direction } from '@/common/enums/Direction.js';


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

