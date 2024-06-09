import { Schema, model } from 'mongoose';


const routeProcessingDataSchema = new Schema({
    buildingId:{
        type: Schema.Types.String, 
        require:true
    },
    isTest:{
        type: Schema.Types.Boolean, 
        default:false,
    },
    routeName:{
        type: Schema.Types.String, 
        require:true,
    },
    route:{
        type: Schema.Types.Array, 
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }           
    },
    checkpoints:{
        type: Schema.Types.Array, 
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }               
    },
    sensorsData:{
        type: Schema.Types.Array, 
        require:true,       
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }       
    },
    wifiData:{

    },
    gpsData:{
        
    }
}, { 
    timestamps: true,
    autoCreate: true,
});


const RouteProcessingDataSchema = model('RouteProcessingDataSchema', routeProcessingDataSchema);
export default RouteProcessingDataSchema;
