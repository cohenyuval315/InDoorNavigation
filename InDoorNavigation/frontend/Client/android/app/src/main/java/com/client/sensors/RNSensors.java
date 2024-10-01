// package com.client.sensors;

// import android.hardware.Sensor;
// import android.hardware.SensorEvent;
// import android.hardware.SensorEventListener;
// import android.hardware.TriggerEvent;
// import android.hardware.TriggerEventListener;
// import android.hardware.SensorManager;
// import android.os.SystemClock;
// import androidx.annotation.Nullable;
// import android.util.Log;

// import com.facebook.react.bridge.Arguments;
// import com.facebook.react.bridge.Promise;
// import com.facebook.react.bridge.ReactApplicationContext;
// import com.facebook.react.bridge.ReactContextBaseJavaModule;
// import com.facebook.react.bridge.ReactMethod;
// import com.facebook.react.bridge.WritableMap;
// import com.facebook.react.modules.core.DeviceEventManagerModule;

// public class RNSensors extends ReactContextBaseJavaModule{

//   private final ReactApplicationContext reactContext;
//   private final SensorManager sensorManager;
//   private double lastReading = (double) System.currentTimeMillis();
//   private int interval;
//   private Arguments arguments;
//   private int logLevel = 0;
//   private String sensorName;
//   private int sensorType;
//   private float[] rotation = new float[9];
//   private float[] orientation = new float[3];
//   private float[] quaternion = new float[4];
//   private int listenerCount = 0;

//   public RNSensors(ReactApplicationContext reactContext) {
//     super(reactContext);
//     this.reactContext = reactContext;
//     this.sensorManager = (SensorManager)reactContext.getSystemService(reactContext.SENSOR_SERVICE);
//   }

//   // RN Methods
//     @ReactMethod
//     public void getSensors(Promise promise) {
//       if (this.sensor == null) {
//         // No sensor found, throw error
//         promise.reject(new RuntimeException("No " + this.sensorName + " found"));
//         return;
//       }
//       promise.resolve(null);
//     }
// }