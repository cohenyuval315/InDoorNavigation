import { Schema } from 'mongoose';
import { MapEdge } from '../../../../../../common/interfaces/MapEdge.js';
import { SegmentPathType } from '../../../../../../common/enums/SegmentPathType.js';


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

