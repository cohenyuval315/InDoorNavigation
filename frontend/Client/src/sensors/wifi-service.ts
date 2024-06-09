// import Geolocation, { GeolocationConfiguration, GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';
import { Observable, BehaviorSubject, Observer, Subscription, share, Subject, interval, last, first, timestamp, shareReplay } from 'rxjs';

import { NativeModules } from 'react-native';
const {WifiModule} = NativeModules;

interface WifiResponse {
  networks: WifiNetwork[];
}

interface WifiNetwork {
  BSSID: string;
  SSID: string;
  capabilities: string;
  frequency: number;
  level: number;
  timestamp: number;
}


interface WifiResponse {
  BSSID: string;
  SSID: string;
  capabilities: string;
  frequency: number;
  level: number;
  timestamp: number;
}

export class WifiService {
  private static instance: WifiService;
  private wifiSubject: Subject<WifiResponse | string |  null>;
  private subscription: Subscription | undefined;
  private scanInterval: number = 2 * 60 * 1000; // 2 minutes in milliseconds
  private scansPerInterval: number = 4;
  private maxWifiInterval: number;
  
  private constructor() {
    this.wifiSubject = new Subject<WifiResponse | string | null>();
    this.maxWifiInterval = this.scanInterval/this.scansPerInterval;
  }  

  static getInstance(): WifiService {
    if (!WifiService.instance) {
        WifiService.instance = new WifiService();
       
    }
    return WifiService.instance;
  }  
  initialLoad = async () => {
    const data = await WifiModule.loadWifiList();
    this.wifiSubject.next(data);
}

    getWifiData = async (value:any) => {
      try{
        const data = await WifiModule.reScanAndLoadWifiList();
        if(data){
            data.timestamp = value.timestamp;
            this.wifiSubject.next(data);
        }
        
      }catch(error){

      }
    }
    startStream(){
      if(!this.subscription){
          this.subscription = interval(this.maxWifiInterval)
          .pipe(share({resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false}),timestamp())
          .subscribe({
            next:this.getWifiData
          });
      }   
    }

  subscribeWifi(observeable: Partial<Observer<WifiResponse | string | null>> | ((value: WifiResponse | string | null) => void) | undefined){
    const unsubscribe = this.wifiSubject.subscribe(observeable)
    return unsubscribe;
  }

  getObservable(){
    return this.wifiSubject.asObservable()
  }

  stopStream () {
    if (this.subscription){
      this.subscription.unsubscribe()
    }
  }
}


