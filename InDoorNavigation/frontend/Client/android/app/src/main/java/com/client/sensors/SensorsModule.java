package com.client.sensors;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.util.Timer;
import java.util.TimerTask;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class SensorsModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private Timer timer;

    public SensorsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SensorsModule";
    }
    @ReactMethod
    public void test(Callback callback) {
        String test = "test_callback";
        callback.invoke(test);
    }
    @ReactMethod(isBlockingSynchronousMethod = true)
    public String testSync() {
        return "test_string_sync";
    }



    @ReactMethod
    public void testStartListening() {
        // Simulate sending data every second
        timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                testSendData();
            }
        }, 0, 1000); // Send data every 1 second
    }

    private void testSendData() {
        WritableMap data = Arguments.createMap();
        // Here, you can add your data to the map
        data.putString("message", "Hello from Native Module!");

        // Emit the event to JS
        this.reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("DataEvent", data);
    }

    @ReactMethod
    public void testStopListening() {
        if (timer != null) {
            timer.cancel();
        }
    }
    
}
