// // @ts-nocheck

// import client from "../../services/server/api-client";


// class SensorFusion { 

// }
// class InterialNavigationSystem {
//     fusion(data,fusion:SensorFusion){
        
//     }
// }



// class WifiOrchastration { 

// }

// class MagneticOrchastration {

// }

// class WifiFingerprinting { 
//     constructor (orchastration:WifiOrchastration) {
//         return this
//     }
// }   


// class MagneticMatching {
//     private orchastration: MagneticOrchastration
//     constructor (orchastration:MagneticOrchastration){
//         this.orchastration = orchastration;
//         return this
//     }

//     match(magenticData){

//     }

// }

// class EngineIntegration { 

// }

// interface SensorData { 
//     magnetometer:any
//     accelerometer:any
//     gyroscope:any
//     stepdetector:any
//     rotationVector:any
//     gravity:any
//     linearAcceleration:any
// }

// interface EngineData {
//     gpsData: any
//     wifiData:any
//     lastUserState:any
//     sensorsData:SensorData

// }
// interface WifiFingerprintResult{

// }

// interface MagneticMatchingResult {
     
// }
// interface InterialNavigationSystemResult {
    
// }

// interface UserState { 

// }

// interface ExtendedKalmanFilter {

// }


// interface Position {
    
// }

// class OrchestrationFilter {
//     filter(data:any);
// }
// class Orchestration{
//     filter(orchestrationFilters :OrchestrationFilter[]){
//         data
//     }
//     transform(data:any);
// }

// class AccelerometerOrchestration implements Orchestration{
//     transform() {}
// }
// class MagnetometerOrchestration  implements Orchestration{

// }

// class GyroscopeOrchestration  implements Orchestration{
//     transform() {
        
//     }
// }

// class InterialNavigationSystemOrchastration {
//     constructor(acc :AccelerometerOrchestration, gyro:GyroscopeOrchestration, mag:MagnetometerOrchestration){

//     }
// }


// new MapEngine(
//     new INS(new INSOrchastration()),
//     new WifiFingerprinting(new WifiOrchastration(FilterBy(Normalize()))), ),
//     new MagneticMatching(new MagneticOrchastration()).integrate(
//         new EngineIntegration(
//             new MagneticWifiIntegration()
//         )
//     )



// class MapEngine {
//     wifiFingerprinting:WifiFingerprinting
//     magneticMatching:MagneticMatching
//     interialNavigationSystem:INS  
//     constructor(interialNavigationSystem:InterialNavigationSystem,wifiFingerprinting:WifiFingerprinting,magneticMatching:MagneticMatching,integration:){
//         this.interialNavigationSystem = interialNavigationSystem;
//         this.wifiFingerprint = wifiFingerprinting;
//         this.magneticMatching = magneticMatching;
//     }

//     async calculateNextPosition(){

//     }

//     async init(){
//         // buildingId, boundary, floor altitudes,
//         // 
//     }

//     async recv(data:EngineData){
//         if(data.wifiData){

//         }
//         if(data.gpsData){

//         }
//         if(data.sensorsData){

//         }
//     }


//     // async wifiFingerprint():Promise<WifiFingerprintResult> {
//     //     return {}
//     // }

//     async integrate(wifiResult:WifiFingerprintResult, magneticResult: MagneticMatchingResult, interialNavigationSystem:InterialNavigationSystemResult):Promise<UserState>{
//         return {

//         }
//     }

//     async magneticMatching() : Promise<MagneticMatchingResult>{
//         return {}
//     }

//     async interialNavigationSystem(data:EngineData) : Promise<InterialNavigationSystemResult>{
//         const {sensorsData} = data;
//         this.interialNavigationSystemOrchestration()
//         const {accelerometer,gravity,gyroscope,linearAcceleration,magnetometer,rotationVector,stepdetector} = sensorsData;
        
//         return {}
//     }
//     async interialNavigationSystemOrchestration (data:SensorData) { 


//     }

//     async stepDetection(){

//     }

//     async stepLengthEstimation(){

//     }

//     async stepEstimation(){

//     }

//     async AHRS(sensorData:SensorData){

//     }
//     async sensorFusion(){

//     }

//     async  PDR(position, stepLength, heading, heightChange) {
//         // Convert heading to radians
//         const azimuth = heading * Math.PI / 180;
      
//         // Calculate new x and y based on the step length and heading
//         const newX = position.x + stepLength * Math.cos(azimuth);
//         const newY = position.y + stepLength * Math.sin(azimuth);
//         const newZ = position.z + heightChange;
    
      
//         return { 
//           x: newX, 
//           y: newY,
//           z: newZ
//         };
//       }



// }