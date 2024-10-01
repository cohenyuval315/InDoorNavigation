package com.client.wifi;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;

import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

import android.net.wifi.WifiManager;
import android.net.wifi.ScanResult;

import static com.client.wifi.WifiScanResultsMapper.mapWifiScanResults;
import com.client.wifi.WifiScanResultReceiver;
import java.util.List;

public class WifiModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private final WifiManager wifi;

    public WifiModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        wifi = (WifiManager) reactContext.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        
    }

    @Override
    public String getName() {
        return "WifiModule";
    }

    @ReactMethod
    public void loadWifiList(final Promise promise) {
        try {
            final List<ScanResult> scanResults = wifi.getScanResults();
            final WritableArray results = mapWifiScanResults(scanResults);
            promise.resolve(results);
        } catch (final Exception exception) {
            promise.reject(exception.getMessage());
        }
    }

    @ReactMethod
    public void reScanAndLoadWifiList(final Promise promise) {
        boolean wifiStartScan = wifi.startScan();
        if (wifiStartScan == true) {
          final WifiScanResultReceiver wifiScanResultReceiver = new WifiScanResultReceiver(wifi, promise);
          getReactApplicationContext().registerReceiver(wifiScanResultReceiver, new IntentFilter(WifiManager.SCAN_RESULTS_AVAILABLE_ACTION));
        } else {
            promise.resolve("Starting Android 9, it's only allowed to scan 4 times per 2 minuts in a foreground app.");
        }
    }
    @ReactMethod
    public void getDeviceHardwareConfigurations(final Promise promise) {
        // try {
        //     int maxFrequency = this.wifi.getMaxScanResults();
        //     promise.resolve(maxFrequency);
        // } catch (final Exception exception) {
        //     promise.reject(exception.getMessage());
        // }
    }

    // @ReactMethod
    // public void loadWifiList(final Promise promise) {
    //     try {
    //         // wifi.onScanResultsAvailable()
    //         final List<ScanResult> scanResults = wifi.getScanResults();
    //         final WritableArray results = mapWifiScanResults(scanResults);
    //         promise.resolve(results);
    //     } catch (final Exception exception) {
    //         promise.reject(exception.getMessage());
    //     }
    // }

    // public lockWifi(){
    //     this.wifi.acquire();
    //     this.wifi.isHeld();
    //     this.wifi.release();
    //     // this.wifi.finalize();
    // }




}
