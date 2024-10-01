package com.client.sensors;

import android.hardware.Sensor;
import android.hardware.SensorManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.client.sensors.SensorsModule;
import com.client.sensors.AndroidSensor;

public class SensorsPackage implements ReactPackage {

   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }

   @Override
   public List<NativeModule> createNativeModules(
           ReactApplicationContext reactContext) {
       List<NativeModule> modules = Arrays.asList(
        new AndroidSensor(reactContext, "AndroidSensorGyroscope", Sensor.TYPE_GYROSCOPE),
        new AndroidSensor(reactContext, "AndroidSensorAccelerometer", Sensor.TYPE_ACCELEROMETER),
        new AndroidSensor(reactContext, "AndroidSensorGravity", Sensor.TYPE_GRAVITY),
        new AndroidSensor(reactContext, "AndroidSensorMagnetometer", Sensor.TYPE_MAGNETIC_FIELD),
        new AndroidSensor(reactContext, "AndroidSensorBarometer", Sensor.TYPE_PRESSURE),
        new AndroidSensor(reactContext, "AndroidSensorOrientation", Sensor.TYPE_ROTATION_VECTOR)
       );
    //    SensorManager sensorManager = (SensorManager) reactContext.getSystemService(ReactApplicationContext.SENSOR_SERVICE);
    //     for (Sensor sensor : sensorList) {
    //         String sensorName = sensor.getName();
    //         modules.add(new AndroidSensor(reactContext, sensorName, sensor.getType()));
    //     }

    //    modules.add(new SensorsModule(reactContext));
       return modules;
   }

}