import { Schema, model } from 'mongoose';
import WIFIFingerprintSchema from './building/navigation/WIFIFingerprint';
import magneticProfileSchema from './building/navigation/MagneticProfile';
import segmentSchema from './building/map/Segment';
import waypointSchema from './building/map/Waypoint';

const buildingNavigationData = new Schema({
    buildingId: {
        type: Schema.Types.ObjectId, 
        require:true
    },
    waypoints:{
        type:[waypointSchema],
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }              
    },
    segments:{
        type:[segmentSchema],
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }               
    },
    WIFIFingerprintsSignalsMap:{
        type:[WIFIFingerprintSchema],
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }       
    },
    MagneticProfilesHeatMap:{
        type:[magneticProfileSchema],
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


const BuildingNavigationData = model('BuildingNavigationData', buildingNavigationData);
export default BuildingNavigationData;
