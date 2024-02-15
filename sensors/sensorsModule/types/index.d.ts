// types/index.d.ts

declare module 'react-native-sensors-module' {
    // Add your type declarations here
  
    // interface SensorData {
    //   // Example: Define the structure of the sensor data
    //   x: number;
    //   y: number;
    //   z: number;
    // }
  
    export interface Sensors {
      getSensorData: () => String;
      // Add more methods and types as needed
    }
  
    const sensors: Sensors;
    export default sensors;
  }
  