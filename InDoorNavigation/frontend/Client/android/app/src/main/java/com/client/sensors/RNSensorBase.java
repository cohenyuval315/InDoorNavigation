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

// public class RNSensor extends ReactContextBaseJavaModule implements SensorEventListener {

//   private final ReactApplicationContext reactContext;
//   private final SensorManager sensorManager;
//   private final Sensor sensor;
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
//   private TriggerEventListener triggerEventListenerSignificantMotion;
//   private TriggerEventListener triggerEventListenerStepDetector;

//   public RNSensor(ReactApplicationContext reactContext, String sensorName, int sensorType) {
//     super(reactContext);
//     this.reactContext = reactContext;
//     this.sensorType = sensorType;
//     this.sensorName = sensorName;
//     this.sensorManager = (SensorManager)reactContext.getSystemService(reactContext.SENSOR_SERVICE);
//     this.sensor = this.sensorManager.getDefaultSensor(this.sensorType);
//   }

//   // RN Methods
//     @ReactMethod
//     public void isAvailable(Promise promise) {
//       if (this.sensor == null) {
//         // No sensor found, throw error
//         promise.reject(new RuntimeException("No " + this.sensorName + " found"));
//         return;
//       }
//       promise.resolve(null);
//     }

//   @ReactMethod
//   public void getFifoMaxEventCount(Promise promise) {
//       if (this.sensor == null) {
//           promise.reject(new RuntimeException("Sensor is not available"));
//           return;
//       }
//       promise.resolve(sensor.getFifoMaxEventCount());
//   }

//   @ReactMethod
//   public void getFifoReservedEventCount(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getFifoReservedEventCount());
//       } else {
//           promise.reject(new RuntimeException("Sensor is not available"));
//       }
//   }

//   @ReactMethod
//   public void getHighestDirectReportRateLevel(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getHighestDirectReportRateLevel());
//       } else {
//           promise.reject(new RuntimeException("Sensor is not available"));
//       }
//   }

//   @ReactMethod
//   public void getId(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getId());
//       } else {
//           promise.reject(new RuntimeException("Sensor is not available"));
//       }
//   }

//   @ReactMethod
//   public void getMaxDelay(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getMaxDelay());
//       } else {
//           promise.reject(new RuntimeException("Sensor is not available"));
//       }
//   }

//   @ReactMethod
//   public void getMaximumRange(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getMaximumRange());
//       } else {
//           promise.reject(new RuntimeException("Sensor is not available"));
//       }
//   }

//   @ReactMethod
//   public void getMinDelay(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getMinDelay());
//       } else {
//           promise.reject(new RuntimeException("Sensor is not available"));
//       }
//   }

//   @ReactMethod
//   public void getSensorName(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getName());
//       } else {
//           promise.resolve(null); // Returning null to indicate no sensor
//       }
//   }

//   @ReactMethod
//   public void getPower(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getPower());
//       } else {
//           promise.resolve(null); // Returning null to indicate no sensor
//       }
//   }

//   @ReactMethod
//   public void getReportingMode(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getReportingMode());
//       } else {
//           promise.resolve(null); // Returning null to indicate no sensor
//       }
//   }

//   @ReactMethod
//   public void getResolution(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getResolution());
//       } else {
//           promise.reject(new RuntimeException("Sensor is not available"));
//       }
//   }

//   @ReactMethod
//   public void getStringType(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getStringType());
//       } else {
//           promise.resolve(null); // Returning null to indicate no sensor
//       }
//   }

//   @ReactMethod
//   public void getType(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getType());
//       } else {
//           promise.reject(new RuntimeException("Sensor is not available"));
//       }
//   }

//   @ReactMethod
//   public void getVendor(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getVendor());
//       } else {
//           promise.resolve(null); // Returning null to indicate no sensor
//       }
//   }

//   @ReactMethod
//   public void getVersion(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.getVersion());
//       } else {
//           promise.reject(new RuntimeException("Sensor is not available"));
//       }
//   }

//   @ReactMethod
//   public void isAdditionalInfoSupported(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.isAdditionalInfoSupported());
//       } else {
//           promise.resolve(false); // Returning false to indicate no sensor
//       }
//   }

//   @ReactMethod
//   public void isDynamicSensor(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.isDynamicSensor());
//       } else {
//           promise.resolve(false); // Returning false to indicate no sensor
//       }
//   }

//   @ReactMethod
//   public void isWakeUpSensor(Promise promise) {
//       if (this.sensor != null) {
//           promise.resolve(sensor.isWakeUpSensor());
//       } else {
//           promise.resolve(false); // Returning false to indicate no sensor
//       }
//   }

//   @ReactMethod
//   public void isSensorAvailable(Promise promise) {
//       boolean isAvailable = this.sensor != null;
//       promise.resolve(isAvailable);
//   }

//   @ReactMethod
//   public void setUpdateInterval(int newInterval) {
//     this.interval = newInterval;
//   }

//   @ReactMethod
//   public void setLogLevel(int newLevel) {
//     this.logLevel = newLevel;
//   }

//   @ReactMethod
//   public void startUpdates() {
//     // Milliseconds to Microseconds conversion
//     sensorManager.registerListener(this, sensor, this.interval * 1000);
//   }

//   @ReactMethod
//   public void stopUpdates() {
//     sensorManager.unregisterListener(this);
//   }

//   @Override
//   public String getName() {
//     return this.sensorName;
//   }

//   private static double sensorTimestampToEpochMilliseconds(long elapsedTime) {
//     // elapsedTime = The time in nanoseconds at which the event happened.
//     return System.currentTimeMillis() + ((elapsedTime-SystemClock.elapsedRealtimeNanos())/1000000L);
//   }

//   // SensorEventListener Interface
//   private void sendEvent(String eventName, @Nullable WritableMap params) {
//     try {
//       this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//         .emit(eventName, params);
//     } catch (RuntimeException e) {
//       Log.e("ERROR", "java.lang.RuntimeException: Trying to invoke Javascript before CatalystInstance has been set!");
//     }
//   }

//   @Override
//   public void onSensorChanged(SensorEvent sensorEvent) {
//     if(this.listenerCount <= 0) {
//       return; // avoid all the computation if there are no observers
//     }

//     int currentType = sensorEvent.sensor.getType();
//     if(currentType != this.sensorType) { // not for the current Sensor
//       return;
//     }

//     double tempMs = (double) System.currentTimeMillis();
//     if (tempMs - lastReading >= interval) {
//       lastReading = tempMs;
//       WritableMap map = this.arguments.createMap();

//       switch (currentType)
//       {
//         case Sensor.TYPE_LINEAR_ACCELERATION:
//         // case Sensor.TYPE_ROTATION_VECTOR:
//         case Sensor.TYPE_GAME_ROTATION_VECTOR:
//         case Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR:
//         case Sensor.TYPE_ORIENTATION:
//         case Sensor.TYPE_POSE_6DOF:
//         case Sensor.TYPE_HINGE_ANGLE:
//         case Sensor.TYPE_HEAD_TRACKER:
//         case Sensor.TYPE_ACCELEROMETER_UNCALIBRATED:
//         case Sensor.TYPE_GYROSCOPE_UNCALIBRATED:
//         case Sensor.TYPE_MAGNETIC_FIELD_UNCALIBRATED:

//         case Sensor.TYPE_ACCELEROMETER:
//         case Sensor.TYPE_GRAVITY:
//         case Sensor.TYPE_GYROSCOPE:
//         case Sensor.TYPE_MAGNETIC_FIELD:
//           handleCommonSensorFields(sensorEvent, map);
//           // map.putDouble("x", sensorEvent.values[0]);
//           // map.putDouble("y", sensorEvent.values[1]);
//           // map.putDouble("z", sensorEvent.values[2]);
//           break;

//         case Sensor.TYPE_LIGHT:
//             map.putDouble("lightLevel", sensorEvent.values[0]);
//             break;

//         case Sensor.TYPE_PRESSURE:
//             map.putDouble("pressure", sensorEvent.values[0]);
//             break;

//         case Sensor.TYPE_PROXIMITY:
//             map.putDouble("proximityDistance", sensorEvent.values[0]);
//             break;

//         case Sensor.TYPE_RELATIVE_HUMIDITY:
//             map.putDouble("relativeHumidity", sensorEvent.values[0]);
//             break;

//         case Sensor.TYPE_AMBIENT_TEMPERATURE:
//             map.putDouble("ambientTemperature", sensorEvent.values[0]);
//             break;

//         case Sensor.TYPE_STATIONARY_DETECT:
//         case Sensor.TYPE_MOTION_DETECT:
//         case Sensor.TYPE_HEART_BEAT:
//             map.putDouble("value", sensorEvent.values[0]);
//             break;

//         case Sensor.TYPE_LOW_LATENCY_OFFBODY_DETECT:
//             map.putDouble("offBodyState", sensorEvent.values[0]);
//             break;

//         case Sensor.TYPE_HEADING:
//             map.putDouble("heading", sensorEvent.values[0]);
//             map.putDouble("headingAccuracy", sensorEvent.values[1]);
//             break;

//         case Sensor.TYPE_STEP_COUNTER:
//             map.putDouble("counter", sensorEvent.values[0]);
//             break;

//         case Sensor.TYPE_ROTATION_VECTOR:
//           SensorManager.getQuaternionFromVector(quaternion, sensorEvent.values);
//           SensorManager.getRotationMatrixFromVector(rotation, sensorEvent.values);
//           SensorManager.getOrientation(rotation, orientation);

//           map.putDouble("qw", quaternion[0]);
//           map.putDouble("qx", quaternion[1]);
//           map.putDouble("qy", quaternion[2]);
//           map.putDouble("qz", quaternion[3]);

//           map.putDouble("yaw", orientation[0]);
//           map.putDouble("pitch", orientation[1]);
//           map.putDouble("roll", orientation[2]);
//           handleCommonSensorFields(sensorEvent,map);
//           break;

//         default:
//           Log.e("ERROR", "Sensor type '" + currentType + "' not implemented!");
//           return;
//       }
//       String description = getSensorDescription(currentType);
//       if (description != null) {
//           map.putString("description", description);
//       }
//       String unit = getSensorUnit(currentType);
//       if (unit != null) {
//           map.putString("unit", unit);
//       }      
//       // timestamp is added to all events
//       map.putDouble("timestamp", this.sensorTimestampToEpochMilliseconds(sensorEvent.timestamp));
//       map.putDouble("firstEventAfterDiscontinuity", sensorEvent.firstEventAfterDiscontinuity ? 1.0 : 0.0);
//       map.putString("sensorName", sensorEvent.sensor.getName());      
//       this.sendEvent(this.sensorName, map);
//     }
//   }
//   private void handleCommonSensorFields(SensorEvent sensorEvent, WritableMap map) {
//     map.putInt("sensorType", sensorEvent.sensor.getType());
//     map.putInt("accuracy", sensorEvent.accuracy);
//     for (int i = 0; i < sensorEvent.values.length; i++) {
//         map.putDouble("value" + i, sensorEvent.values[i]);
//     }
//     map.putDouble("timestamp", this.sensorTimestampToEpochMilliseconds(sensorEvent.timestamp));
//   }

// //   @ReactMethod
// //   public void startListeningForSignificantMotion() {
// //     triggerEventListenerSignificantMotion = new TriggerEventListener() {
// //       @Override
// //       public void onTrigger(TriggerEvent event) {
// //         // Do work when significant motion is detected
// //         WritableMap map = arguments.createMap();
// //         map.putString("event", "significant_motion_detected");
// //         sendEvent("significant_motion", map);
// //       }
// //     };

// //     sensorManager.requestTriggerSensor(triggerEventListenerSignificantMotion, sensor);
// //   }
// //   @ReactMethod
// //   public void stopListeningForSignificantMotion() {
// //     // Stop listening for significant motion
// //     sensorManager.cancelTriggerSensor(triggerEventListenerSignificantMotion);
// //   }
// //   @ReactMethod
// //   public void startListeningForStepDetector() {
// //     triggerEventListenerStepDetector = new TriggerEventListener() {
// //       @Override
// //       public void onTrigger(TriggerEvent event) {
// //         // Do work when step is detected
// //         WritableMap map = arguments.createMap();
// //         map.putString("event", "step_detected");
// //         sendEvent("step_detector", map);
// //       }
// //     };

// //     sensorManager.requestTriggerSensor(triggerEventListenerStepDetector, sensor);
// //   }
// //   @ReactMethod
// //   public void stopListeningForStepDetector() {
// //     // Stop listening for step detector events
// //     sensorManager.cancelTriggerSensor(triggerEventListenerStepDetector);
// //   }



//   private String getSensorDescription(int sensorType) {
//     switch (sensorType) {
//         case Sensor.TYPE_ACCELEROMETER:
//         return "Measures acceleration along the x, y, and z axes in m/s^2\n" +
//               "values[0]: Acceleration minus Gx on the x-axis\n" +
//               "values[1]: Acceleration minus Gy on the y-axis\n" +
//               "values[2]: Acceleration minus Gz on the z-axis";
//         case Sensor.TYPE_GRAVITY:
//             return "Measures the force of gravity along the x, y, and z axes in m/s^2";
//         case Sensor.TYPE_GYROSCOPE:
//             return "Measures angular velocity around the x, y, and z axes in rad/s";
//         case Sensor.TYPE_MAGNETIC_FIELD:
//             return "Measures the ambient magnetic field along the x, y, and z axes in uT";
//         case Sensor.TYPE_ROTATION_VECTOR:
//             return "Represents the orientation of the device as a combination of an angle and an axis";
//         case Sensor.TYPE_ORIENTATION:
//             return "Measures the azimuth, pitch, and roll angles in degrees";
//         default:
//             return null;
//     }
//   }
  


//   private String getSensorUnit(int sensorType) {
//     switch (sensorType) {
//         case Sensor.TYPE_ACCELEROMETER:
//             return "m/s^2";
//         case Sensor.TYPE_GRAVITY:
//             return "m/s^2";
//         case Sensor.TYPE_GYROSCOPE:
//             return "rad/s";
//         case Sensor.TYPE_MAGNETIC_FIELD:
//             return "uT";
//         case Sensor.TYPE_ORIENTATION:
//             return "degrees";
//         default:
//             return null;
//     }
//   }
  


//   @Override
//   public void onAccuracyChanged(Sensor sensor, int accuracy) {
//   }

//   // this is called by RN when the first listener is registered
//   // not implementing this method will cause a warning on RN 0.65 onwards
//   @ReactMethod
//   public void addListener(String eventName) {
//     this.listenerCount += 1;
//   }

//   // this is called by RN when the last listener is deregistered
//   // not implementing this method will cause a warning on RN 0.65 onwards
//   @ReactMethod
//   public void removeListeners(Integer count) {
//     this.listenerCount -= count;
//     // If we no longer have listeners registered we should also probably also stop the sensor since the sensor events are essentially being dropped.
//     if (this.sensorManager != null && this.listenerCount <= 0) {
//       stopUpdates(); // maybe only calling `stopUpdates()` is enough
//     }
//   }
// }