package com.client.sensors;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import android.hardware.Sensor;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

public class RNSensorsPackage implements ReactPackage {
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
      return Arrays.<NativeModule>asList(
        new RNSensorUtils(reactContext),
        new RNSensor(reactContext, "RNSensorsAccelerometer", Sensor.TYPE_ACCELEROMETER),
        new RNSensor(reactContext, "RNSensorsAccelerometerLimitedAxes", Sensor.TYPE_ACCELEROMETER_LIMITED_AXES),
        new RNSensor(reactContext, "RNSensorsAccelerometerLimitedAxesUncalibrated", Sensor.TYPE_ACCELEROMETER_LIMITED_AXES_UNCALIBRATED),
        new RNSensor(reactContext, "RNSensorsAccelerometerUncalibrated", Sensor.TYPE_ACCELEROMETER_UNCALIBRATED),
        new RNSensor(reactContext, "RNSensorsAll", Sensor.TYPE_ALL),
        new RNSensor(reactContext, "RNSensorsAmbientTemperature", Sensor.TYPE_AMBIENT_TEMPERATURE),
        new RNSensor(reactContext, "RNSensorsPrivateBase", Sensor.TYPE_DEVICE_PRIVATE_BASE),
        new RNSensor(reactContext, "RNSensorsGameRotationVector", Sensor.TYPE_GAME_ROTATION_VECTOR),
        new RNSensor(reactContext, "RNSensorsGeomagneticRotation", Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR),
        new RNSensor(reactContext, "RNSensorsGravity", Sensor.TYPE_GRAVITY),
        new RNSensor(reactContext, "RNSensorsGyroscope", Sensor.TYPE_GYROSCOPE),
        new RNSensor(reactContext, "RNSensorsGyroscopeLimitedAxes", Sensor.TYPE_GYROSCOPE_LIMITED_AXES),
        new RNSensor(reactContext, "RNSensorsGyroscopeLimitedAxesUncalibrated", Sensor.TYPE_GYROSCOPE_LIMITED_AXES_UNCALIBRATED),
        new RNSensor(reactContext, "RNSensorsGyroscopeUncalibrated", Sensor.TYPE_GYROSCOPE_UNCALIBRATED),
        new RNSensor(reactContext, "RNSensorsHeading", Sensor.TYPE_HEADING),
        new RNSensor(reactContext, "RNSensorsHeadTracker", Sensor.TYPE_HEAD_TRACKER),
        new RNSensor(reactContext, "RNSensorsHeartBeat", Sensor.TYPE_HEART_BEAT),
        new RNSensor(reactContext, "RNSensorsHeartRate", Sensor.TYPE_HEART_RATE),
        new RNSensor(reactContext, "RNSensorsHingeAngle", Sensor.TYPE_HINGE_ANGLE),
        new RNSensor(reactContext, "RNSensorsLight", Sensor.TYPE_LIGHT),
        new RNSensor(reactContext, "RNSensorsLinearAcceleration", Sensor.TYPE_LINEAR_ACCELERATION),
        new RNSensor(reactContext, "RNSensorsLowLatencyOffbodyDetect", Sensor.TYPE_LOW_LATENCY_OFFBODY_DETECT),
        new RNSensor(reactContext, "RNSensorsMagnetometer", Sensor.TYPE_MAGNETIC_FIELD),
        new RNSensor(reactContext, "RNSensorsMagnetometerUncalibrated", Sensor.TYPE_MAGNETIC_FIELD_UNCALIBRATED),
        new RNSensor(reactContext, "RNSensorsMotionDetect", Sensor.TYPE_MOTION_DETECT),
        new RNSensor(reactContext, "RNSensorsOrientationDeprecated", Sensor.TYPE_ORIENTATION),
        new RNSensor(reactContext, "RNSensorsPos6DegreeFreedom", Sensor.TYPE_POSE_6DOF),
        new RNSensor(reactContext, "RNSensorsBarometer", Sensor.TYPE_PRESSURE),
        new RNSensor(reactContext, "RNSensorsProximity", Sensor.TYPE_PROXIMITY),
        new RNSensor(reactContext, "RNSensorsRelativeHumidity", Sensor.	TYPE_RELATIVE_HUMIDITY),
        new RNSensor(reactContext, "RNSensorsRotationVector", Sensor.TYPE_ROTATION_VECTOR),
        new RNSensor(reactContext, "RNSensorsSignificantMotion", Sensor.TYPE_SIGNIFICANT_MOTION),
        new RNSensor(reactContext, "RNSensorsStationaryDetect", Sensor.TYPE_STATIONARY_DETECT),
        new RNSensor(reactContext, "RNSensorsStepCounter", Sensor.TYPE_STEP_COUNTER),
        new RNSensor(reactContext, "RNSensorsStepDetector", Sensor.TYPE_STEP_DETECTOR),
        new RNSensor(reactContext, "RNSensorsTemperatureDeprecated", Sensor.TYPE_TEMPERATURE)
        
        
        
        // no sdk
        // new RNSensor(reactContext, "RNSensorsPickUpGesture", Sensor.TYPE_PICK_UP_GESTURE),
        // new RNSensor(reactContext, "RNSensorsGlanceGesture", Sensor.TYPE_GLANCE_GESTURE),
        // new RNSensor(reactContext, "RNSensorsTilt", Sensor.TYPE_TILT_DETECTOR)
        
      );
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
      return Collections.emptyList();
    }

    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
      return Collections.emptyList();
    }
}