import { UserMapCoordinates } from "../common/UserMapCoordinates";
import { UserSpatialInputData } from "../common/UserSpatialInputData";
import { UserSpatialState } from "../common/UserSpatialState";
import { AHRS } from "./AHRS/AHRS";
import { IMU } from "./IMU/IMU";
import { StepDetection } from "./step-detection/StepDetection";
import { StepLengthEstimation } from "./step-length-estimation/StepLengthEstimation";

// interface blue {
//     ok:number,
//     [key: string]: any;
// }


//Calling
//Dangling
//Handheld
//Pocket
//General
//average error ,
//rmse
//max error
// CEP(95%)

// RADAR
// MDTW
// WLS

export interface InterialNavigationSystemResult {

}



export class InterialNavigationSystem {
    private imu: IMU
    private ahrs: AHRS
    private stepDetection: StepDetection
    private stepLengthEstimation: StepLengthEstimation

    constructor(
        imu:IMU,
        ahrs:AHRS,
        stepDetection:StepDetection,
        stepLengthEstimation:StepLengthEstimation

    ){
        this.imu = imu;
        this.ahrs = ahrs;
        this.stepDetection = stepDetection;
        this.stepLengthEstimation = stepLengthEstimation
    }

    
    async getUserPosition(prevState:UserSpatialState,data:UserSpatialInputData):Promise<InterialNavigationSystemResult | null>{
        const {
            magnetometer,
            accelerometer,
            gyroscope,
            stepdetector,
            rotationVector,
            gravity,
            linear,
        } = data;
        return null;

        //this.imu 
        //take the data and output the normalized data i guess
        // for now lets assume the data is good
        if(!prevState.position){
            return null;
        }


        const { x, y, z, heading } = prevState.position;
        
        const v = rotationVector?.data;
        const a = accelerometer?.data;
        const g = gyroscope?.data;
        const m = magnetometer?.data;
        const sd = stepdetector?.data;
        const gr = gravity?.data;
        const l = linear?.data;
        
        const timestamp = performance.now();
        // @ts-ignore
        const dt = timestamp - prevState.timestamp;
        // @ts-ignore
        prevState.timestamp = timestamp

        const dtInSeconds = dt / 1000;
        
        

        if(v){
            const vData = v.data;
            const cos = vData['cos(θ/2)'];
            const xsin = vData['x*sin(θ/2)'];
            const ysin = vData['y*sin(θ/2)'];
            const zsin = vData['z*sin(θ/2)'];
            const {yaw, roll, pitch, qx,qy,qz,qw} = vData;
        }

        if(a){
            if(typeof a == "object"){
                const numLastValue = a.length;
                for (let index = 0; index < numLastValue; index++) {
                    const accElement = a[index];
                    const accData =  accElement.data
                    const aTimestamp = accElement.rawTimestamp;
                    const {x:ax,y:ay,z:az} = accData;

                    
                }
            }
            
        }
        if(g){
            const gData = g.data;
            const gTimestamp = g.RawTimestamp
            const {x:gx ,y:gy,z:gz} = gData;
        }

        if(gr){
            const grData = gr.data;
            const grTimestamp = gr.RawTimestamp
            const {x:grx ,y:gry,z:grz} = grData;
        }

        if(m){
            const mData = m.data;
            const mTimestamp = m.RawTimestamp
            const {x:mx ,y:my,z:mz} = mData;
        }
        
        if(sd){
            // very bad at detecting...
        }

        if(l){
            const lData = l.data;
            const lTimestamp = l.RawTimestamp
            const {x:lx ,y:ly,z:lz} = lData;
        }
        return null;
        

        // // @ts-ignore
        // const dtSec = dt * NS2S; // Convert time delta to seconds

        // const normalizedYaw = this._normalizeYaw(yaw);
        // const newHeading = normalizedYaw;
        // const stepLength = 1.0; 

        // let  heightChange = 0
        // if(a.z){
        //     heightChange = a.z * dtSec
        // }
        

        // const newPosition = this.pedestrianDeadReckoning(
        //     prevState.position,
        //     stepLength,newHeading,
        //     heightChange
        // )

        // return newPosition;
    }


    pedestrianDeadReckoning(position:UserMapCoordinates, stepLength:number, heading:number, heightChange:number) {
        // Convert heading to radians
        const azimuth = heading * Math.PI / 180;
      
        // Calculate new x and y based on the step length and heading
        const newX = position.x + stepLength * Math.cos(azimuth);
        const newY = position.y + stepLength * Math.sin(azimuth);
        const newZ = position.z + heightChange;
    
      
        return { 
          x: newX, 
          y: newY,
          z: newZ,
          heading:heading,
          floor:position.floor
        };
      }
      
      _normalizeYaw(yaw:number) {
        // Normalize yaw to be within -180 to 180 degrees range
        yaw = yaw % 360;
        if (yaw < 0) {
            yaw += 360; // Add 360 degrees to negative angles
        }
        return yaw;
    }
    

}