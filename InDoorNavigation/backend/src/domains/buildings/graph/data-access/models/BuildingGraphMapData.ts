import { Schema, model } from 'mongoose';
import buildingGraphFloorMapSchema from './embedded/BuildingGraphFloorMap.js';
import buildingMapNodeSchema from './embedded/BuildingMapNode.js';
import buildingMapEdgeSchema from './embedded/BuildingMapEdge.js';
import buildingMapFloorSchema from './embedded/BuildingMapFloor.js';

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
