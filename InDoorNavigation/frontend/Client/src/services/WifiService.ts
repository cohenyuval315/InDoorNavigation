// import Geolocation, { GeolocationConfiguration, GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';
import { Observable, BehaviorSubject, Subscription, share, Subject, interval, last, first, timestamp, shareReplay } from 'rxjs';

import { NativeModules } from 'react-native';
//@ts-ignore
import {Observer } from "rxjs";



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
  private isStreaming: boolean
  
  private constructor() {
    this.wifiSubject = new Subject<WifiResponse | string | null>();
    this.maxWifiInterval = this.scanInterval/this.scansPerInterval;
    this.isStreaming = false;
  }  

  static getString(){
    return "wifi";
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


  getCurrentWifiData = async () => {
      const data = await WifiModule.reScanAndLoadWifiList();
      return data;
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
          this.isStreaming = true;
      }else{
        console.log("already streaming wifi")
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
      this.isStreaming = false;
    }
  }

  getIsStreaming(){
    return this.isStreaming;
  }
}


