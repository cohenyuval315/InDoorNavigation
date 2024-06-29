// import Geolocation, { GeolocationConfiguration, GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';
import { Observable, BehaviorSubject, Observer, Subscription, share } from 'rxjs';
import RNGeolocation, { GeolocationConfiguration,GeolocationError, GeolocationResponse } from "@react-native-community/geolocation";
import { Subject } from 'rxjs';
 
export interface Coordinates {
  /**
   * a double representing the position's latitude in decimal degrees.
   */
  latitude: number;

  /**
   * A double representing the position's longitude in decimal degrees.
   */
  longitude: number;

  /**
   * A double representing the accuracy of the latitude and longitude properties,
   * expressed in meters.
   */
  accuracy: number;

  /**
   * A double representing the position's altitude in metres, relative to sea
   * level. This value can be null if the implementation cannot provide the data.
   */
  altitude: number;

  /**
   * A double representing the accuracy of the altitude expressed in meters.
   * This value can be null.
   */
  altitudeAccuracy: number;

  /**
   * A double representing the direction in which the device is traveling. This
   * value, specified in degrees, indicates how far off from heading true north
   * the device is. 0 degrees represents true north, and the direction is
   * determined clockwise (which means that east is 90 degrees and west is 270
   * degrees). If speed is 0, heading is NaN. If the device is unable to provide
   * heading information, this value is null.
   */
  heading: number;

  /**
   * A double representing the velocity of the device in meters per second.
   * This value can be null.
   */
  speed: number;
}

export interface Geoposition {
  /**
   * A Coordinates object defining the current location
   */
  coords: Coordinates;

  /**
   * A timestamp representing the time at which the location was retrieved.
   */
  timestamp: number;
}

export interface PositionError {
  /**
   * A code that indicates the error that occurred
   */
  code: number;

  /**
   * A message that can describe the error that occurred
   */
  message: string;
}


export interface GeolocationOptions {
  /**
   * Is a positive long value indicating the maximum age in milliseconds of a
   * possible cached position that is acceptable to return. If set to 0, it
   * means that the device cannot use a cached position and must attempt to
   * retrieve the real current position. If set to Infinity the device must
   * return a cached position regardless of its age. Default: 0.
   */
  maximumAge?: number;

  /**
   * Is a positive long value representing the maximum length of time
   * (in milliseconds) the device is allowed to take in order to return a
   * position. The default value is Infinity, meaning that getCurrentPosition()
   * won't return until the position is available.
   */
  timeout?: number;

  /**
   * Indicates the application would like to receive the best possible results.
   * If true and if the device is able to provide a more accurate position, it
   * will do so. Note that this can result in slower response times or increased
   * power consumption (with a GPS chip on a mobile device for example). On the
   * other hand, if false, the device can take the liberty to save resources by
   * responding more quickly and/or using less power. Default: false.
   * @type {boolean}
   */
  enableHighAccuracy?: boolean;
}

export interface GeolocationStreamOptions {
  // interval (ms) -- (Android only) The rate in milliseconds at which your app prefers to receive location updates. Note that the location updates may be somewhat faster or slower than this rate to optimize for battery usage, or there may be no updates at all (if the device has no connectivity, for example).
  // fastestInterval (ms) -- (Android only) The fastest rate in milliseconds at which your app can handle location updates. Unless your app benefits from receiving updates more quickly than the rate specified in interval, you don't need to set it.
  // timeout (ms) - Is a positive value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. Defaults to 10 minutes.
  // maximumAge (ms) - Is a positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device will always return a cached position regardless of its age. Defaults to INFINITY.
  // enableHighAccuracy (bool) - Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested.
  // distanceFilter (m) - The minimum distance from the previous location to exceed before returning a new location. Set to 0 to not filter locations. Defaults to 100m.
  // useSignificantChanges (bool) - Uses the battery-efficient native significant changes APIs to return locations. Locations will only be returned when the device detects a significant distance has been breached. Defaults to FALSE.  
    timeout?: number,
    maximumAge?: number,
    enableHighAccuracy?: boolean,
    distanceFilter?: number,
    useSignificantChanges?: boolean,
}


export interface GPSStatus {
  isAvailable:string,

  errorMessage:string,
  hasPermissions:boolean,
  isLocationServiceAvailable:boolean,
  isPositionAvailable:boolean,
  timeout:number,
}

export interface GPSErrorStatus { 
  message:string,
  hasPermissions:boolean,
  isPositionAvailable:boolean,
  timeout:number,
}

export interface AndroidGeolocationStreamOptions extends GeolocationStreamOptions {
  // interval (ms) -- (Android only) The rate in milliseconds at which your app prefers to receive location updates. Note that the location updates may be somewhat faster or slower than this rate to optimize for battery usage, or there may be no updates at all (if the device has no connectivity, for example).
  // fastestInterval (ms) -- (Android only) The fastest rate in milliseconds at which your app can handle location updates. Unless your app benefits from receiving updates more quickly than the rate specified in interval, you don't need to set it.
    interval?: number,
    fastestInterval?: number,
}



export class GeolocationService {
  private static instance: GeolocationService;
  private gpsSubject: Subject<GeolocationResponse | null>;
  private watchSubscription: Subscription | null = null;
  
  private constructor() {
    this.gpsSubject = new Subject<GeolocationResponse | null>();
  }  

  static getInstance(): GeolocationService {
    if (!GeolocationService.instance) {
      GeolocationService.instance = new GeolocationService();
       
    }
    return GeolocationService.instance;
  }  
 
  getCurrentGPSPosition = async (options:GeolocationOptions): Promise<GeolocationResponse> => {
    return new Promise((resolve, reject) => {
      RNGeolocation.getCurrentPosition(
        (position:GeolocationResponse) => resolve(position),
        (error:GeolocationError) => reject(error),
        options
      );
    });
  };

  setConfig(config:GeolocationConfiguration){
    RNGeolocation.setRNConfiguration(config);
  }

  // requestAuthorization = (onSuccess?: (() => void) | undefined, onError?: ((error: GeolocationError) => void) | undefined) => {
  //   RNGeolocation.requestAuthorization(onSuccess,onError)
  // }
  requestAuthorization = async (): Promise<void> => {
      return new Promise((resolve, reject) => {
        RNGeolocation.requestAuthorization(
          () => resolve(),
          (error: GeolocationError) => reject(error),    
        );
      });      
  };  

  parseResponse = (error:GeolocationError) => {
    console.error(error.message);
    
    
    switch(error.code){

      case 1:{ // PERMISSION_DENIED
        break;
      } 

      case 2:{ // POSITION_UNAVAILABLE
        break;
      }

      case 3:{ // TIMEOUT
        break;
      }

    }
    return 
  }

  getGPSStatus = async (options:GeolocationOptions) => {
    try {
      const response = await this.getCurrentGPSPosition(options)
      return true;
    }catch(error){
      return false;
    }finally{

    }
  }

  watchPosition(options?: GeolocationStreamOptions): Observable<Geoposition> {
    return new Observable<Geoposition>((observer: Observer<Geoposition>) => {
      const watchId = RNGeolocation.watchPosition(
        (position: GeolocationResponse) => observer.next(position as Geoposition),
        (error: GeolocationError) => observer.error(error),
        options
      );
      return () => RNGeolocation.clearWatch(watchId);
    });
  }

  subscribeGeoLocation(observeable: Partial<Observer<GeolocationResponse | null>> | ((value: GeolocationResponse | null) => void) | undefined){
    const unsubscribe = this.gpsSubject.subscribe(observeable)
    return unsubscribe;
  }

  getObservable(){
    return this.gpsSubject.asObservable()
  }



  startStream(options?: GeolocationStreamOptions,restartOnConfig:boolean=false){
    if (this.watchSubscription) {
      
      if (restartOnConfig){
        console.log('Geolocation stream already started, restarts...');
        this.stopStream();
      }else{
        return;
      }
    }

    const positionObservable = this.watchPosition(options);
    this.watchSubscription = positionObservable.subscribe({
      next: (position: GeolocationResponse) => this.gpsSubject.next(position),
      error: (error: GeolocationError) => this.gpsSubject.error(error),
    });
  }

  stopStream() {
    if (this.watchSubscription) {
      this.watchSubscription.unsubscribe();
      this.watchSubscription = null;
    }
  }

  isStreaming(){
    return this.watchSubscription != null;
  }


}