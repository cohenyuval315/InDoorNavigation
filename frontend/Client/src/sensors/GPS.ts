import Geolocation, { GeolocationConfiguration, GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';

type AuthorizationLevel = 'whenInUse' | 'always' | 'auto';
type LocationProvider = 'playServices' | 'android' | 'auto';

const authorizationLevelOptions: AuthorizationLevel[] = ['whenInUse', 'always', 'auto'];
const locationProviderOptions: LocationProvider[] = ['playServices', 'android', 'auto'];

export class GPS {
  private static instance: GPS;
  private watchId: number | null
  private constructor() {
    this.watchId = null;
    // Private constructor to prevent instantiation outside the class
  }
  static getInstance(): GPS {
    if (!GPS.instance) {
        GPS.instance = new GPS();
       
    }
    return GPS.instance;
  }

  setGPSConfigurations = (
      skipPermissionRequests:boolean=true,
      authorizationLevel:AuthorizationLevel = 'auto',
      enableBackgroundLocationUpdates:boolean=true,
      locationProvider:LocationProvider = 'auto',
      ) => {
    const config:GeolocationConfiguration =  { 
      skipPermissionRequests: skipPermissionRequests, //default false
      authorizationLevel: authorizationLevel, // 'always' | 'whenInUse' | 'auto'
      enableBackgroundLocationUpdates: enableBackgroundLocationUpdates,
      locationProvider: locationProvider, // 'playServices' | 'android' | 'auto
    }
    Geolocation.setRNConfiguration(config);
  }

  getCurrentGPSPosition = async ({
    enableHighAccuracy = true,
    timeout,
    maximumAge,
  }: {
    enableHighAccuracy?: boolean,
    timeout?: number,
    maximumAge?: number,
  }): Promise<GeolocationResponse> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {
          ...(timeout !== undefined ? { timeout } : {}),
          ...(maximumAge !== undefined ? { maximumAge } : {}),
          enableHighAccuracy,
        }
      );
    });
  };

  getCurrentGPSPositionCallback = (
    onSuccessCallback: (position: GeolocationResponse) => void,
    onErrorCallback: (err: GeolocationError) => void,
    {
      enableHighAccuracy=true,
      timeout,
      maximumAge,
    }: {
      enableHighAccuracy?: boolean,
      timeout?: number,
      maximumAge?: number,
    }
  ) => {
    Geolocation.getCurrentPosition(
      position => onSuccessCallback(position),
      error => onErrorCallback(error),
      {
        ...(timeout !== undefined ? { timeout } : {}),
        ...(maximumAge !== undefined ? { maximumAge } : {}),
        enableHighAccuracy,
      }
    );
  };

  requestAuthorizationCallback = (
    onSuccessCallback: () => void,
    onErrorCallback: (err: GeolocationError) => void,
    ): void => {    
      return Geolocation.requestAuthorization(
        () => onSuccessCallback(),
        (error: GeolocationError) => onErrorCallback(error)
    ); 
  }

  requestAuthorization = async (): Promise<void> => {
      return new Promise((resolve, reject) => {
        Geolocation.requestAuthorization(
          () => resolve(),
          (error: GeolocationError) => reject(error),    
        );
      });      
  };  

  requestClearWatch(watchID: number){
    if(this.watchId){
      Geolocation.clearWatch(this.watchId);
    }
    Geolocation.clearWatch(watchID);
  }

  requestWatchPosition = async  (
    onSuccessCallback: (position: GeolocationResponse) => void,
    onErrorCallback: (err: GeolocationError) => void,
    {
      interval,
      fastestInterval,
      timeout,
      maximumAge,
      enableHighAccuracy,
      distanceFilter,
      useSignificantChanges,
    }: {
      interval?: number,
      fastestInterval?: number,
      timeout?: number,
      maximumAge?: number,
      enableHighAccuracy?: boolean,
      distanceFilter?: number,
      useSignificantChanges?: boolean,
    },
    ) => {
      const options = {
        ...(interval !== undefined ? { interval } : {}),
        ...(fastestInterval !== undefined ? { fastestInterval } : {}),
        ...(timeout !== undefined ? { timeout } : {}),
        ...(maximumAge !== undefined ? { maximumAge } : {}),
        ...(enableHighAccuracy !== undefined ? { enableHighAccuracy } : {}),
        ...(distanceFilter !== undefined ? { distanceFilter } : {}),
        ...(useSignificantChanges !== undefined ? { useSignificantChanges } : {}),
      };
    
      const watchID = Geolocation.watchPosition(
        position => onSuccessCallback(position),
        error => onErrorCallback(error),
        options
      );
      this.watchId = watchID;
      return watchID;
  }
}

// export const setGPSConfigurations = (
//     skipPermissionRequests:boolean=true,
//     authorizationLevel:AuthorizationLevel = 'auto',
//     enableBackgroundLocationUpdates:boolean=true,
//     locationProvider:LocationProvider = 'auto',
//     ) => {
//   const config:GeolocationConfiguration =  { 
//     skipPermissionRequests: skipPermissionRequests, //default false
//     authorizationLevel: authorizationLevel, // 'always' | 'whenInUse' | 'auto'
//     enableBackgroundLocationUpdates: enableBackgroundLocationUpdates,
//     locationProvider: locationProvider, // 'playServices' | 'android' | 'auto
//   }
//   Geolocation.setRNConfiguration(config);
// }


// export const getCurrentGPSPosition = async (
//   enableHighAccuracy:boolean=true,
//   timeout:number=20000,
//   maximumAge:number=1000
// ): Promise<GeolocationResponse> => {
//     return new Promise((resolve, reject) => {
//       Geolocation.getCurrentPosition(
//         (position) => resolve(position),
//         (error) => reject(error),
//         { 
//           timeout: timeout,  // timeout (ms) - Is a positive value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. Defaults to 10 minutes.
//           maximumAge: maximumAge,// maximumAge (ms) - Is a positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device will always return a cached position regardless of its age. Defaults to INFINITY.
//           enableHighAccuracy: enableHighAccuracy, // enableHighAccuracy (bool) - Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested.        
//         }            
//       );
//     });      
// };

// export const getCurrentGPSPositionCallback = (
//   onSuccessCallback: (position: GeolocationResponse) => void,
//   onErrorCallback: (err: GeolocationError) => void,
//   enableHighAccuracy:boolean=true,
//   timeout:number=20000,
//   maximumAge:number=1000
//     ) => {
//   Geolocation.getCurrentPosition(
//       (position) => {
//         return onSuccessCallback(position);
//       },
//       (error) => {
//         return onErrorCallback(error)
//       },
//       { 
//         //   options?: {
//         //     timeout?: number;
//         //     maximumAge?: number;
//         //     enableHighAccuracy?: boolean;
//         // }  
//         timeout: timeout,  // timeout (ms) - Is a positive value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. Defaults to 10 minutes.
//         maximumAge: maximumAge,// maximumAge (ms) - Is a positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device will always return a cached position regardless of its age. Defaults to INFINITY.
//         enableHighAccuracy: enableHighAccuracy, // enableHighAccuracy (bool) - Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested.        
//       }
//   );
// };

// export const getGlobalGeoCoordinatesByGPS = async (
//   onSuccessCallback: (position: GeolocationResponse) => void,
//   onErrorCallback: (err: GeolocationError) => void,
//   enableHighAccuracy:boolean=true,
//   timeout:number=20000,
//   maximumAge:number=1000) => {
//     return new Promise((resolve, reject) => {
//       Geolocation.getCurrentPosition(
//         (position) => {
//           // position: {
//           //   coords: {
//           //     latitude: number;
//           //     longitude: number;
//           //     altitude: number | null;
//           //     accuracy: number;
//           //     altitudeAccuracy: number | null;
//           //     heading: number | null;
//           //     speed: number | null;
//           //   };
//           //   timestamp: number;
//           // }          
//           return onSuccessCallback(position);
//         },
//         (error) => {
//           // error: {
//           //   code: number;
//           //   message: string;
//           //   PERMISSION_DENIED: number;
//           //   POSITION_UNAVAILABLE: number;
//           //   TIMEOUT: number;
//           // }          
//           return onErrorCallback(error)
//         },
//         { 
//           //   options?: {
//           //     timeout?: number;
//           //     maximumAge?: number;
//           //     enableHighAccuracy?: boolean;
//           // }  
//           timeout: timeout,  // timeout (ms) - Is a positive value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. Defaults to 10 minutes.
//           maximumAge: maximumAge,// maximumAge (ms) - Is a positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device will always return a cached position regardless of its age. Defaults to INFINITY.
//           enableHighAccuracy: enableHighAccuracy, // enableHighAccuracy (bool) - Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested.        
//         }
//       );
//     });
// };

// export const requestAuthorization = (
//   onSuccessCallback: () => void,
//   onErrorCallback: (err: GeolocationError) => void,
//   ): void => {    
//     return Geolocation.requestAuthorization(
//       () => onSuccessCallback(),
//       (error: GeolocationError) => onErrorCallback(error)
//   ); 
// }

// export const requestWatchPosition = async  (
//   onSuccessCallback: (position: GeolocationResponse) => void,
//   onErrorCallback: (err: GeolocationError) => void,
//   interval: number,
//   fastestInterval: number,
//   timeout: number,
//   maximumAge: number,
//   enableHighAccuracy: boolean,
//   distanceFilter: number,
//   useSignificantChanges: boolean,
//   ) => {
//   return new Promise((resolve, reject) => {
//     const watchId = Geolocation.watchPosition(
//       (position) => {
//         // position: {
//         //   coords: {
//         //     latitude: number;
//         //     longitude: number;
//         //     altitude: number | null;
//         //     accuracy: number;
//         //     altitudeAccuracy: number | null;
//         //     heading: number | null;
//         //     speed: number | null;
//         //   };
//         //   timestamp: number;
//         // }          
//         return onSuccessCallback(position);
//       },


//       (error) =>{ 
//         // code: number;
//         // message: string;
//         // PERMISSION_DENIED: number;
//         // POSITION_UNAVAILABLE: number;
//         // TIMEOUT: number;        
//         // const {
//         //   code,
//         //   message,
//         //   PERMISSION_DENIED,
//         //   POSITION_UNAVAILABLE,
//         //   TIMEOUT,
//         // } = error.error;

//         return onErrorCallback(error)
//       },
//       {
//         // options?: {
//         //   interval?: number;
//         //   fastestInterval?: number;
//         //   timeout?: number;
//         //   maximumAge?: number;
//         //   enableHighAccuracy?: boolean;
//         //   distanceFilter?: number;
//         //   useSignificantChanges?: boolean;
//         // }
//         interval:interval, // interval (ms) -- (Android only) The rate in milliseconds at which your app prefers to receive location updates. Note that the location updates may be somewhat faster or slower than this rate to optimize for battery usage, or there may be no updates at all (if the device has no connectivity, for example).
//         fastestInterval:fastestInterval, // fastestInterval (ms) -- (Android only) The fastest rate in milliseconds at which your app can handle location updates. Unless your app benefits from receiving updates more quickly than the rate specified in interval, you don't need to set it.
//         timeout:timeout, // timeout (ms) - Is a positive value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. Defaults to 10 minutes.
//         maximumAge:maximumAge, // maximumAge (ms) - Is a positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device will always return a cached position regardless of its age. Defaults to INFINITY.
//         enableHighAccuracy:enableHighAccuracy, // enableHighAccuracy (bool) - Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested.
//         distanceFilter:distanceFilter, // distanceFilter (m) - The minimum distance from the previous location to exceed before returning a new location. Set to 0 to not filter locations. Defaults to 100m.
//         useSignificantChanges:useSignificantChanges, // useSignificantChanges (bool) - Uses the battery-efficient native significant changes APIs to return locations. Locations will only be returned when the device detects a significant distance has been breached. Defaults to FALSE.
//       }
//     );
//     resolve(watchId);
//   });  
// }

// export const requestClearWatch = async  (watchID: number,) => {
//   Geolocation.clearWatch(watchID);
// }
