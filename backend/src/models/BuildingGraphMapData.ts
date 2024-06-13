import { Schema, model } from 'mongoose';
import buildingGraphFloorMapSchema from './BuildingGraphFloorMap';
import buildingMapNodeSchema from './BuildingMapNode';
import buildingMapEdgeSchema from './BuildingMapEdge';
import buildingMapFloorSchema from './BuildingMapFloor';

const buildingGraphMapSchema = new Schema({    
    buildingId: {
        type: Schema.Types.ObjectId, 
        require:true
    },  
    graphMaps:{
        type:[buildingGraphFloorMapSchema],
        require:true,

    },
    nodes:{
        type:[buildingMapNodeSchema],
        require:true,
    },
    edges:{
        type:[buildingMapEdgeSchema],
        require:true,

    },
    mapFloors:{
        type: [buildingMapFloorSchema],
        required: true,
    }

}, { 
    timestamps: true,
    autoCreate: true,
});

const BuildingGraphMap = model('BuildingGraphMap', buildingGraphMapSchema);
export default BuildingGraphMap;
