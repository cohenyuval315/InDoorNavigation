package com.client.sensors;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.TriggerEvent;
import android.hardware.TriggerEventListener;
import android.hardware.SensorManager;
import android.os.SystemClock;
import androidx.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class RNSensorUtils extends ReactContextBaseJavaModule{

    private final ReactApplicationContext reactContext;
    private final SensorManager sensorManager;
    private Arguments arguments;
    private float[] rotation = new float[9];
    private float[] orientation = new float[3];
    private float[] quaternion = new float[4];


    public RNSensorUtils(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.sensorManager = (SensorManager)reactContext.getSystemService(reactContext.SENSOR_SERVICE);
    }


    @ReactMethod
    public void getAltitude(float pressureAtPoint1, float pressureAtPoint2, float pressureAtSeaLevel, Promise promise) {
        try {
            float altitude1 = SensorManager.getAltitude(pressureAtSeaLevel, pressureAtPoint1);
            float altitude2 = SensorManager.getAltitude(pressureAtSeaLevel, pressureAtPoint2);
            float altitudeDifference = altitude2 - altitude1;
            promise.resolve(altitudeDifference);
        } catch (Exception e) {
            promise.resolve(null);
        }
    }

    @ReactMethod
    public void getAltitude(float pressureAtPoint1, float pressureAtPoint2, Promise promise) {
        try {
            float diff1 = this.sensorManager.getAltitude(
                this.sensorManager.PRESSURE_STANDARD_ATMOSPHERE, 
                pressureAtPoint1
            );   

            float diff2 = this.sensorManager.getAltitude(
                this.sensorManager.PRESSURE_STANDARD_ATMOSPHERE, 
                pressureAtPoint2
            );      

            float altitude_difference = diff2 - diff1;
            promise.resolve(altitude_difference);
        } catch (Exception e) {
            promise.resolve(null);
        }
    }


    @ReactMethod
    public void getAngleChange(float[] R, float[] prevR, Promise promise) {
        try {
            // Create an array to store the angle change
            float[] angleChange = new float[3];
            // Call the SensorManager function to compute angle change
            SensorManager.getAngleChange(angleChange, R, prevR);
            // Resolve the promise with the angle change array
            promise.resolve(angleChange);
        } catch (Exception e) {
            promise.resolve(null);
        }
    }

    @ReactMethod
    public void getInclination(float[] I, Promise promise) {
        try {
            // Call the SensorManager function to compute geomagnetic inclination angle
            float inclination = SensorManager.getInclination(I);
            // Resolve the promise with the inclination value
            promise.resolve(inclination);
        } catch (Exception e) {
            promise.resolve(null);
        }    
    }

    @ReactMethod
    public void getOrientation(float[] R, Promise promise) {
        try {
            // Create an array to store the orientation
            float[] orientation = new float[3];
            // Call the SensorManager function to compute device orientation
            orientation = SensorManager.getOrientation(R, orientation);
            // Resolve the promise with the orientation array
            promise.resolve(orientation);
        } catch (Exception e) {
            promise.resolve(null);
        }        
    }

    @ReactMethod
    public void getQuaternionFromVector(float[] rv, Promise promise) {
        try {
            // Create an array to store the quaternion
            float[] Q = new float[4];
            // Call the SensorManager function to convert rotation vector to quaternion
            SensorManager.getQuaternionFromVector(Q, rv);
            // Resolve the promise with the quaternion array
            promise.resolve(Q);
        } catch (Exception e) {
            promise.resolve(null);
        }        
    }

    @ReactMethod
    public void getRotationMatrix(float[] gravity, float[] geomagnetic, Promise promise) {
        try {
                // Create arrays to store the rotation matrix and inclination matrix
                float[] R = new float[9];
                float[] I = new float[9];
                // Call the SensorManager function to compute rotation matrix
                boolean success = SensorManager.getRotationMatrix(R, I, gravity, geomagnetic);
                if (success) {
                // Create a map to store the result
                WritableMap result = this.arguments.createMap();
                result.putArray("rotationMatrix", this.arguments.fromArray(R));
                result.putArray("inclinationMatrix", this.arguments.fromArray(I));
                promise.resolve(result);
            } else {
                promise.reject(new RuntimeException("Failed to compute rotation matrix."));
            }        
        } catch (Exception e) {
            promise.resolve(null);
        }        
    }
    @ReactMethod
    public void remapCoordinateSystem(float[] inR, int X, int Y, Promise promise) {
        try {
            // Create an array to store the output rotation matrix
            float[] outR = new float[9];
            // Call the SensorManager function to remap the coordinate system
            boolean success = SensorManager.remapCoordinateSystem(inR, X, Y, outR);
            if (success) {
            // Resolve the promise with the output rotation matrix
            promise.resolve(outR);
            } else {
            promise.reject(new RuntimeException("Invalid input parameters. X and Y cannot define the same axis."));
            }
        } catch (Exception e) {
            promise.resolve(null);
        }        


    }

    @Override
    public String getName() {
        return "SensorUtils";
    }


}