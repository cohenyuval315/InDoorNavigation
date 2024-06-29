export interface GeolocationInputData {
    data:{
        coords:{
            accuracy: number
            altitude: number
            heading:number 
            latitude:number
            longitude:number
            speed: number
        }
        extras: {
            maxCn0: number, 
            meanCn0: number, 
            satellites:number
        }
        mocked:boolean, 
        timestamp:any
    }
    timestamp:any
}

export interface WifiInputData {

}

export interface SensorData {
    data:any
}

export interface UserSpatialInputData {
    geolocation?:GeolocationInputData,
    wifi?:WifiInputData,
    magnetometer?: SensorData,
    accelerometer?: SensorData
    gyroscope?: SensorData
    stepdetector?: SensorData,
    rotationVector?: SensorData
    gravity?: SensorData
    linear?: SensorData
}
