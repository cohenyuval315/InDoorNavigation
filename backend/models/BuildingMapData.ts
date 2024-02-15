import { Schema, model } from 'mongoose';
import POISchema from './building/map/POI';

const buildingMapDataSchema = new Schema({
    buildingId: {
        type: Schema.Types.ObjectId, 
        require:true
    },
    mapImageStorageKey:{
        type: String, 
        require:true
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

    facilitiesWaypointsIds:{ // without invisible waypoints needed for navigation
        type: [Schema.Types.ObjectId], 
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

const BuildingMapData = model('BuildingMapData', buildingMapDataSchema);
export default BuildingMapData;

