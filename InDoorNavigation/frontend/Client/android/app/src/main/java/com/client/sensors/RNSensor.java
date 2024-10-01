package com.client.sensors;
import android.os.Handler;
import android.os.Looper;
import android.os.HandlerThread;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.TriggerEvent;
import android.hardware.TriggerEventListener;
import android.hardware.SensorDirectChannel;
import android.hardware.SensorManager;
import android.os.SystemClock;
import androidx.annotation.Nullable;
import android.util.Log;
import android.os.SystemClock;
import android.hardware.SensorManager.DynamicSensorCallback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.util.List;
    /*
     * https://source.android.com/docs/core/interaction/sensors/suspend-mode
     * Wake up sensor - wake up SoC deliver 
     * non Wake sensor
     * Applications using non-wake-up sensors should either hold a wake lock to ensure the system doesn't go to suspend, unregister from the sensors when they do not need them, or expect to lose events while the SoC is in suspend mode.



     Continuous

     On-change -  sampling_period_ns - min time between event calls, on change

     One-shot - reported no fifo

     spcial
     */


// enum Suspens { 
//     ON, // usualy x100 higher power consumption 
//     IDLE, // medium power
//     SUSPENDED // low power

// }
/*

 Note that the system will not disable sensors automatically when the screen turns off.


 */
public class RNSensor extends ReactContextBaseJavaModule implements SensorEventListener{

  private final ReactApplicationContext reactContext;
  private final SensorManager sensorManager;
  private final Sensor sensor;
  private String sensorName;
  private int sensorType;
  private Handler handler;
  private double lastReading = (double) System.currentTimeMillis();
  private long lastTimestamp = System.nanoTime();
  private int samplingPeriodUs;

  // maxReportLatencyUs = 0 -> is the same as not using this variable
  // is set more then 0 -> Sensor events are batched
  private int maxReportLatencyUs = 0; 

  // -1 = indefinite
  private int numTriggers = -1; 

  private int accuracyInterval;
  private int accuracy;

  private Arguments arguments;
  private int logLevel = 0;

  private float[] rotation = new float[9];
  private float[] orientation = new float[3];
  private float[] quaternion = new float[4];

  private int listenerCount = 0;


  private final float NS2S = 1.0f / 1000000000.0f;
  private final float[] deltaRotationVector = new float[4];
  private float timestamp;
  private DynamicSensorCallback dynamicCallback;
  private TriggerEventListener triggerListener;



  public RNSensor(ReactApplicationContext reactContext, String sensorName, int sensorType) {
    super(reactContext);
    this.reactContext = reactContext;
    this.sensorType = sensorType;
    this.sensorName = sensorName;
    this.sensorManager = (SensorManager)reactContext.getSystemService(reactContext.SENSOR_SERVICE);
    this.sensor = this.getSensor(this.sensorType);
    this.handler = null;
  }

    private Sensor getSensor(int type) {
        List<Sensor> l = this.sensorManager.getSensorList(type);
        boolean wakeUpSensor = false;
        if (type == Sensor.TYPE_PROXIMITY || 
            type == Sensor.TYPE_SIGNIFICANT_MOTION
            // type == Sensor.TYPE_TILT_DETECTOR || 
            // type == Sensor.TYPE_WAKE_GESTURE ||
            // type == Sensor.TYPE_GLANCE_GESTURE || 
            // type == Sensor.TYPE_PICK_UP_GESTURE
            ) {
            wakeUpSensor = true;
        }        
        for (Sensor sensor : l) {
            if (sensor.isWakeUpSensor() == wakeUpSensor) {
                return sensor;
            }
        }        
        return l.isEmpty() ? null : l.get(0);
    }
    
    @Override
    public String getName() {
        return this.sensorName;
    }






    /* SensorEventListener Must Implement */
    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        if(this.listenerCount <= 0) {
            return; 
        }

        if(sensor.getType() != this.sensorType) {
            return;
        }
    
        //   long tempNs = System.nanoTime();
        //   if(lastTimestamp - tempNs < interval){
        //       // later after chaning to nano
        //   }
    
        //   double tempMs = (double) System.currentTimeMillis();
        //   if (tempMs - lastReading < interval) {
        //       return;
        //   }
    
        //   lastReading = tempMs;
        //   WritableMap map = this.arguments.createMap();
        //   addToMap(map, "eventMode", "continuous");
        //   addToMap(map, "timestamp",  tempNs);
        //   addToMap(map, "accuracy",  accuracy);
        //   addToMap(map, "sensorName",  sensor.getName());
        //   addToMap(map, "event", "accuracy");      
        //   this.sendEvent(this.sensorName, map);
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        if(this.listenerCount <= 0) {
        return; // avoid all the computation if there are no observers
        }

        int currentType = sensorEvent.sensor.getType();
        if(currentType != this.sensorType) { // not for the current Sensor
        return;
        }

        long tempNs = System.nanoTime();
        if(lastTimestamp - tempNs < samplingPeriodUs){
            // later after chaning to nano
        }

        double tempMs = (double) System.currentTimeMillis();
        if (tempMs - lastReading < samplingPeriodUs) {
            return;
        }

        lastReading = tempMs;
        WritableMap map = this.arguments.createMap();
        WritableMap eventData = this.arguments.createMap();
        
        // timestamp is added to all events
        addToMap(map, "timestamp", this.sensorTimestampToEpochMilliseconds(sensorEvent.timestamp));
        addToMap(map, "rawTimestamp", String.valueOf(sensorEvent.timestamp));
        addToMap(map, "firstEventAfterDiscontinuity", sensorEvent.firstEventAfterDiscontinuity);
        
        WritableArray values = this.arguments.createArray();
        for (int i = 0; i < sensorEvent.values.length; i++) {
            double d = sensorEvent.values[i];
            values.pushDouble(d);
        }
        buildSensorEvent(eventData, sensorEvent.values, currentType);
        addToMap(map, "rawData", values);
        addToMap(map, "data", eventData);
        addToMap(map, "sensorName",  sensorEvent.sensor.getName());
        addToMap(map, "event", "data");
        addToMap(map, "eventMode", "continuous");
        this.sendEvent(this.sensorName, map);
        
    }
    



    private static class CustomDynamicSensorCallback extends SensorManager.DynamicSensorCallback {

        private final RNSensor parent;
        public CustomDynamicSensorCallback(RNSensor parent) {
            this.parent = parent;
        }      

        /* DynamicSensorCallback Must Implement */
        @Override
        public void onDynamicSensorConnected(Sensor sensor) {
            // Handle sensor connection
        }
    
        @Override
        public void onDynamicSensorDisconnected(Sensor sensor) {
            // Handle sensor disconnection       
        }
    }    

    private static class CustomTriggerEventListener extends TriggerEventListener {
        private final RNSensor parent;
        public CustomTriggerEventListener(RNSensor parent) {
            this.parent = parent;
        }

        /* TriggerEventListener Must Implement */
        public void onTrigger(TriggerEvent event) {
            // Do Work.
            // As it is a one shot sensor, it will be canceled automatically.
            // SensorManager.requestTriggerSensor(this, mSigMotion); needs to
            // be called again, if needed.

            WritableMap map = parent.arguments.createMap();
            WritableArray values = parent.arguments.createArray();
            for (int i = 0; i < event.values.length; i++) {
                double d = event.values[i];
                values.pushDouble(d);
            }    
            parent.addToMap(map, "rawData", values);
            parent.addToMap(map, "timestamp", parent.sensorTimestampToEpochMilliseconds(event.timestamp));
            parent.addToMap(map, "rawTimestamp", String.valueOf(event.timestamp));    
            parent.addToMap(map, "sensorName",  event.sensor.getName());
            parent.addToMap(map, "event", "data");
            parent.addToMap(map, "eventMode", "trigger");
            parent.sendEvent(parent.sensorName, map);
            if(parent.numTriggers != 0){
                if(parent.numTriggers > 0){
                    parent.setNumTriggers(parent.numTriggers - 1);
                }
                parent.sensorManager.requestTriggerSensor(this, event.sensor);
            }
        }

    
    }    


    // SensorEventListener Build Event Helper
    private void buildSensorEvent(WritableMap map,float[] values,int type){
        // -- old --
        // switch (currentType)
        // {
        // case Sensor.TYPE_LINEAR_ACCELERATION:
        // // case Sensor.TYPE_ROTATION_VECTOR:
        // case Sensor.TYPE_GAME_ROTATION_VECTOR:
        // case Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR:
        // case Sensor.TYPE_ORIENTATION:
        // case Sensor.TYPE_POSE_6DOF:
        // case Sensor.TYPE_HINGE_ANGLE:
        // case Sensor.TYPE_HEAD_TRACKER:
        // case Sensor.TYPE_ACCELEROMETER_UNCALIBRATED:
        // case Sensor.TYPE_GYROSCOPE_UNCALIBRATED:
        // case Sensor.TYPE_MAGNETIC_FIELD_UNCALIBRATED:

        // case Sensor.TYPE_ACCELEROMETER:
        // case Sensor.TYPE_GRAVITY:
        // case Sensor.TYPE_GYROSCOPE:
        // case Sensor.TYPE_MAGNETIC_FIELD:
        //     handleCommonSensorFields(sensorEvent, map);
        //     // map.putDouble("x", sensorEvent.values[0]);
        //     // map.putDouble("y", sensorEvent.values[1]);
        //     // map.putDouble("z", sensorEvent.values[2]);
        //     break;

        // case Sensor.TYPE_LIGHT:
        //     map.putDouble("lightLevel", sensorEvent.values[0]);
        //     break;

        // case Sensor.TYPE_PRESSURE:
        //     map.putDouble("pressure", sensorEvent.values[0]);
        //     break;

        // case Sensor.TYPE_PROXIMITY:
        //     map.putDouble("proximityDistance", sensorEvent.values[0]);
        //     break;

        // case Sensor.TYPE_RELATIVE_HUMIDITY:
        //     map.putDouble("relativeHumidity", sensorEvent.values[0]);
        //     break;

        // case Sensor.TYPE_AMBIENT_TEMPERATURE:
        //     map.putDouble("ambientTemperature", sensorEvent.values[0]);
        //     break;

        // case Sensor.TYPE_STATIONARY_DETECT:
        // case Sensor.TYPE_MOTION_DETECT:
        // case Sensor.TYPE_HEART_BEAT:
        //     map.putDouble("value", sensorEvent.values[0]);
        //     break;

        // case Sensor.TYPE_LOW_LATENCY_OFFBODY_DETECT:
        //     map.putDouble("offBodyState", sensorEvent.values[0]);
        //     break;

        // case Sensor.TYPE_HEADING:
        //     map.putDouble("heading", sensorEvent.values[0]);
        //     map.putDouble("headingAccuracy", sensorEvent.values[1]);
        //     break;

        // case Sensor.TYPE_STEP_COUNTER:
        //     map.putDouble("counter", sensorEvent.values[0]);
        //     break;

        // case Sensor.TYPE_ROTATION_VECTOR:
        //     SensorManager.getQuaternionFromVector(quaternion, sensorEvent.values);
        //     SensorManager.getRotationMatrixFromVector(rotation, sensorEvent.values);
        //     SensorManager.getOrientation(rotation, orientation);

        //     map.putDouble("qw", quaternion[0]);
        //     map.putDouble("qx", quaternion[1]);
        //     map.putDouble("qy", quaternion[2]);
        //     map.putDouble("qz", quaternion[3]);

        //     map.putDouble("yaw", orientation[0]);
        //     map.putDouble("pitch", orientation[1]);
        //     map.putDouble("roll", orientation[2]);
        //     handleCommonSensorFields(sensorEvent,map);
        //     break;

        // default:
        //     Log.e("ERROR", "Sensor type '" + currentType + "' not implemented!");
        //     return;
        // }

        try {
            switch (type) {
                case Sensor.TYPE_ACCELEROMETER:
                case Sensor.TYPE_GRAVITY:
                case Sensor.TYPE_LINEAR_ACCELERATION:            
                    map.putDouble("x",values[0]);
                    map.putDouble("y",values[1]);
                    map.putDouble("z",values[2]);
                    break;
                case Sensor.TYPE_ACCELEROMETER_LIMITED_AXES:
                    map.putDouble("x",values[0]);
                    map.putDouble("y",values[1]);
                    map.putDouble("z",values[2]);
                    map.putDouble("supported_x",values[3]);
                    map.putDouble("supported_y",values[4]);                
                    map.putDouble("supported_z",values[5]);               
                    break;
                case Sensor.TYPE_ACCELEROMETER_LIMITED_AXES_UNCALIBRATED:
                    map.putDouble("x_uncalib_no_bias",values[0]);
                    map.putDouble("y_uncalib_no_bias",values[1]);
                    map.putDouble("z_uncalib_no_bias",values[2]);
                    map.putDouble("estimated_x_bias",values[3]);
                    map.putDouble("estimated_y_bias",values[4]);                
                    map.putDouble("estimated_z_bias",values[5]); 
                    map.putDouble("supported_x",values[6]);
                    map.putDouble("supported_y",values[7]);                
                    map.putDouble("supported_z",values[8]);                                  
                    break;
                case Sensor.TYPE_ACCELEROMETER_UNCALIBRATED:
                    map.putDouble("x_uncalib_no_bias",values[0]);
                    map.putDouble("y_uncalib_no_bias",values[1]);
                    map.putDouble("z_uncalib_no_bias",values[2]);
                    map.putDouble("estimated_x_bias",values[3]);
                    map.putDouble("estimated_y_bias",values[4]);                
                    map.putDouble("estimated_z_bias",values[5]);                
                    break;
                case Sensor.TYPE_ALL:
                    break;
                case Sensor.TYPE_AMBIENT_TEMPERATURE:
                    map.putDouble("temperature",values[0]);
                    break;
                case Sensor.TYPE_DEVICE_PRIVATE_BASE:
                    break;
                case Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR:
                    break;
                case Sensor.TYPE_GYROSCOPE:
                    map.putDouble("x",values[0]);
                    map.putDouble("y",values[1]);
                    map.putDouble("z",values[2]);            
                    break;
                case Sensor.TYPE_GYROSCOPE_LIMITED_AXES:
                    map.putDouble("x",values[0]);
                    map.putDouble("y",values[1]);
                    map.putDouble("z",values[2]);
                    map.putDouble("supported_x",values[3]);
                    map.putDouble("supported_y",values[4]);                
                    map.putDouble("supported_z",values[5]);                
                    break;
                case Sensor.TYPE_GYROSCOPE_LIMITED_AXES_UNCALIBRATED:
                    map.putDouble("x_uncalib_no_drift",values[0]);
                    map.putDouble("y_uncalib_no_drift",values[1]);
                    map.putDouble("z_uncalib_no_drift",values[2]);
                    map.putDouble("estimated_x_drift",values[3]);
                    map.putDouble("estimated_y_drift",values[4]);                
                    map.putDouble("estimated_z_drift",values[5]); 
                    map.putDouble("supported_x",values[6]);
                    map.putDouble("supported_y",values[7]);                
                    map.putDouble("supported_z",values[8]);              
                    break;
                case Sensor.TYPE_GYROSCOPE_UNCALIBRATED:
                    map.putDouble("x_angular_speed",values[0]);
                    map.putDouble("y_angular_speed",values[1]);
                    map.putDouble("z_angular_speed",values[2]);
                    if(values.length > 3){ // Always use the length of the values array while performing operations on it. In earlier versions, this used to be always 3 which has changed now.
                        map.putDouble("x_estimated_drift",values[3]);
                        map.putDouble("y_estimated_drift",values[4]);
                        map.putDouble("z_estimated_drift",values[5]);  
                    }
                    break;
                case Sensor.TYPE_HEADING:
                    map.putDouble("heading",values[0]);               
                    map.putDouble("accuracy",values[1]);   
                    break;
                case Sensor.TYPE_HEAD_TRACKER:
                    map.putDouble("x_euler_vector_rotation",values[0]);
                    map.putDouble("y_euler_vector_rotation",values[1]);
                    map.putDouble("z_euler_vector_rotation",values[2]);
                    map.putDouble("x_euler_vector_angular_velocity",values[3]);
                    map.putDouble("x_euler_vector_angular_velocity",values[4]);
                    map.putDouble("x_euler_vector_angular_velocity",values[5]);               
                    break;
                case Sensor.TYPE_HEART_BEAT:
                    map.putDouble("confidence",values[0]);
                    break;  
                case Sensor.TYPE_HEART_RATE:
                    break;
                case Sensor.TYPE_HINGE_ANGLE:
                    map.putDouble("angle",values[0]);
                    break;  
                case Sensor.TYPE_LIGHT:
                    map.putDouble("light",values[0]);
                    break;
                case Sensor.TYPE_LOW_LATENCY_OFFBODY_DETECT:
                    map.putDouble("off_body_state",values[0]);
                    break;
                case Sensor.TYPE_MAGNETIC_FIELD:
                    map.putDouble("x",values[0]);
                    map.putDouble("y",values[1]);
                    map.putDouble("z",values[2]);            
                    break;
                case Sensor.TYPE_MAGNETIC_FIELD_UNCALIBRATED:
                    map.putDouble("x_uncalib",values[0]);
                    map.putDouble("y_uncalib",values[1]);
                    map.putDouble("z_uncalib",values[2]);
                    map.putDouble("x_bias",values[3]);
                    map.putDouble("y_bias",values[4]);
                    map.putDouble("z_bias",values[5]);                            
                    break;
                case Sensor.TYPE_MOTION_DETECT:
                    map.putDouble("value",values[0]);
                    break;
                case Sensor.TYPE_ORIENTATION:
                    map.putDouble("azimuth", values[0]);
                    map.putDouble("pitch", values[1]);
                    map.putDouble("roll", values[2]);
                    break;
                case Sensor.TYPE_POSE_6DOF:
                    map.putDouble("x*sin(θ/2)", values[0]);
                    map.putDouble("y*sin(θ/2)", values[1]);
                    map.putDouble("z*sin(θ/2)", values[2]);            
                    map.putDouble("cos(θ/2)", values[3]);
                    map.putDouble("x_translation_from_origin", values[4]);
                    map.putDouble("y_translation_from_origin", values[5]);
                    map.putDouble("z_translation_from_origin", values[6]);
                    map.putDouble("delta_quaternion_rotation_x*sin(θ/2)", values[7]);
                    map.putDouble("delta_quaternion_rotation_y*sin(θ/2)", values[8]);            
                    map.putDouble("delta_quaternion_rotation_z*sin(θ/2)", values[9]);
                    map.putDouble("delta_quaternion_rotation_cos(θ/2)", values[10]);
                    map.putDouble("delta_translation_x", values[11]);                        
                    map.putDouble("delta_translation_y", values[12]);
                    map.putDouble("delta_translation_z", values[13]);            
                    map.putDouble("sequence_number", values[14]);            
                    break;
                case Sensor.TYPE_PRESSURE:
                    map.putDouble("pressure",values[0]);
                    break;
                case Sensor.TYPE_PROXIMITY:
                    map.putDouble("distance",values[0]);
                    break;
                case Sensor.TYPE_RELATIVE_HUMIDITY:
                    map.putDouble("humidity",values[0]);
                    break;

                case Sensor.TYPE_GAME_ROTATION_VECTOR:                
                case Sensor.TYPE_ROTATION_VECTOR:
                    // float[] rotation = new float[9];
                    // float[] orientation = new float[3];
                    // float[] quaternion = new float[4];
                    // float inclination = 0;

                    SensorManager.getQuaternionFromVector(quaternion, values);
                    SensorManager.getRotationMatrixFromVector(rotation, values);
                    // SensorManager.getInclination(rotation)
                    SensorManager.getOrientation(rotation, orientation);
                    map.putDouble("x*sin(θ/2)",values[0]);
                    map.putDouble("y*sin(θ/2)",values[1]);
                    map.putDouble("z*sin(θ/2)",values[2]);   
                    map.putDouble("cos(θ/2)",values[3]);  
                    map.putDouble("estimatedHeadingAccuracy",values[4]);  

                    map.putDouble("qw", quaternion[0]);
                    map.putDouble("qx", quaternion[1]);
                    map.putDouble("qy", quaternion[2]);
                    map.putDouble("qz", quaternion[3]);

                    map.putDouble("yaw", orientation[0]);
                    map.putDouble("pitch", orientation[1]);
                    map.putDouble("roll", orientation[2]);
                    break;
                case Sensor.TYPE_SIGNIFICANT_MOTION:
                    break;
                case Sensor.TYPE_STATIONARY_DETECT:
                    map.putDouble("value",values[0]);
                    break;
                case Sensor.TYPE_STEP_COUNTER:
                    map.putDouble("step_counter", values[0]);
                    break;
                case Sensor.TYPE_STEP_DETECTOR:
                    break;
                case Sensor.TYPE_TEMPERATURE:
                    map.putDouble("temperature",values[0]);
                    break;
                default:
                    break;
            }
        
        } catch (Exception e) {
            map.putString("error",e.toString());
            map.putString("sensor",getType());
        }

    }




    /* React Setters And Getters */
    @ReactMethod
    public void getSensorInformation(Promise promise) {
        WritableMap map = this.arguments.createMap();
        if (this.sensor == null) {
            this.addToMap(map,"RNtypeIndex",this.sensorType);
            this.addToMap(map,"RNtype",getTypeBySensorType());
            this.addToMap(map,"RNName",this.sensorName);
            this.addToMap(map,"isAvailable",false);
            promise.resolve(map);
            return;
        }
        WritableMap dataFieldsMap = this.arguments.createMap();
        WritableMap fieldsMap = this.arguments.createMap();
        this.getDataFieldsDescriptions(dataFieldsMap,this.sensorType);
        this.getFieldsDescriptions(fieldsMap,this.sensorType);

        this.addToMap(map,"isAvailable",true);
        this.addToMap(map,"id",sensor.getId());
        this.addToMap(map,"name",sensor.getName());
        this.addToMap(map,"typeIndex",sensor.getType());
        this.addToMap(map,"type",getType());
        this.addToMap(map,"stringType",sensor.getStringType());
        this.addToMap(map,"RNtype",this.sensorType);
        this.addToMap(map,"RNtypeIndex",getTypeBySensorType());
        this.addToMap(map,"RNName",this.sensorName);
        this.addToMap(map,"description",this.getSensorDescription(this.sensorType));
        this.addToMap(map,"unit",this.getSensorUnit(this.sensorType));        
        this.addToMap(map,"fieldsDescriptions",fieldsMap);        
        this.addToMap(map,"dataFieldsDescriptions",dataFieldsMap);        
        this.addToMap(map,"power",sensor.getPower());        
        this.addToMap(map,"maximumRange",sensor.getMaximumRange());        
        this.addToMap(map,"vendor",sensor.getVendor());        
        this.addToMap(map,"version",sensor.getVersion());        
        this.addToMap(map,"maxDelay",sensor.getMaxDelay());        
        this.addToMap(map,"minDelay",sensor.getMinDelay());        
        this.addToMap(map,"reportingMode",this.getReportingMode());        
        this.addToMap(map,"reportingModeIndex",sensor.getReportingMode());        
        this.addToMap(map,"isWakeUpSensor",sensor.isWakeUpSensor());        
        this.addToMap(map,"isDynamicSensor",sensor.isDynamicSensor());        
        this.addToMap(map,"resolution",sensor.getResolution());        
        this.addToMap(map,"isAdditionalInfoSupported",sensor.isAdditionalInfoSupported());        
        this.addToMap(map,"isMemoryFileDirectChannelTypeSupported ",sensor.isDirectChannelTypeSupported(SensorDirectChannel.TYPE_MEMORY_FILE));        
        this.addToMap(map,"isHardwareBufferDirectChannelTypeSupported ",sensor.isDirectChannelTypeSupported(SensorDirectChannel.TYPE_HARDWARE_BUFFER));        
        this.addToMap(map,"toString ",sensor.toString());        
        this.addToMap(map,"highestDirectReportRateLevelIndex",sensor.getHighestDirectReportRateLevel());        
        this.addToMap(map,"highestDirectReportRateLevel",getHighestDirectReportRateLevel());        
        this.addToMap(map,"fifoMaxEventCount",sensor.getFifoMaxEventCount());        
        this.addToMap(map,"fifoReservedEventCount",sensor.getFifoReservedEventCount());        
        promise.resolve(map);
    }

    @ReactMethod
    public void isSensorAvailable(Promise promise) {
        boolean isAvailable = this.sensor != null;
        promise.resolve(isAvailable);
    }

    @ReactMethod
    public void setUpdateInterval(int newSamplingPeriodUs) {
    this.samplingPeriodUs = newSamplingPeriodUs;
    }

    @ReactMethod
    public void setUpdateMaxReportLatencyUs(int newMaxReportLatencyUs) {
        this.maxReportLatencyUs = newMaxReportLatencyUs;
    }
    
    @ReactMethod
    public void setLogLevel(int newLevel) {
    this.logLevel = newLevel;
    }

    @ReactMethod
    public void setNumTriggers(int numTriggers) {
    if (numTriggers < -1){
        this.numTriggers = -1;
    }else{
        this.numTriggers = numTriggers;
    }
    }


    @ReactMethod
    public void setHandler(int newHandlerType) {
    switch (newHandlerType) {
        case 0:
            this.handler = null;
            break;
        case 1:
            this.handler = new Handler(Looper.getMainLooper());
            break;
        case 2:
            this.handler = new Handler(Looper.myLooper());   
            break;     
        case 3:
            HandlerThread backgroundThread = new HandlerThread("BackgroundThread");
            backgroundThread.start();
            this.handler = new Handler(backgroundThread.getLooper());
            break;                 
        default:
            this.handler = null;
            break;
        }
    }


    @ReactMethod
    public void getPower(Promise promise){
      if (this.sensor == null) {
          // No sensor found, throw error
          promise.reject(new RuntimeException("No " + this.sensorName + " found"));
      }
      promise.resolve(this.sensor.getPower());
    }
   
    @ReactMethod
    public void getMaximumRange(Promise promise){
      if (this.sensor == null) {
          // No sensor found, throw error
          promise.reject(new RuntimeException("No " + this.sensorName + " found"));
      }
      promise.resolve(this.sensor.getMaximumRange());
    }
   
    @ReactMethod
    public void getMaxDelay(Promise promise){
      if (this.sensor == null) {
          // No sensor found, throw error
          promise.reject(new RuntimeException("No " + this.sensorName + " found"));
      }
      promise.resolve(this.sensor.getMaxDelay());
    }
   
    @ReactMethod
    public void getMinDelay(Promise promise){
      if (this.sensor == null) {
          // No sensor found, throw error
          promise.reject(new RuntimeException("No " + this.sensorName + " found"));
      }
      promise.resolve(this.sensor.getMinDelay());
    }
    
    @ReactMethod
    public void getHighestDirectReportRateLevel(Promise promise){
      if (this.sensor == null) {
          // No sensor found, throw error
          promise.reject(new RuntimeException("No " + this.sensorName + " found"));
      }
      promise.resolve(this.sensor.getHighestDirectReportRateLevel());
    }
  
    @ReactMethod
    public void getFifoMaxEventCount(Promise promise){
      if (this.sensor == null) {
          // No sensor found, throw error
          promise.reject(new RuntimeException("No " + this.sensorName + " found"));
      }
      promise.resolve(this.sensor.getFifoMaxEventCount());
    }
  
    @ReactMethod
    public void getFifoReservedEventCount(Promise promise){
      if (this.sensor == null) {
          // No sensor found, throw error
          promise.reject(new RuntimeException("No " + this.sensorName + " found"));
      }
      promise.resolve(this.sensor.getFifoReservedEventCount());
    }
    


      /* React Functions */
      
      @ReactMethod
      public void flushSensor(){
          if(this.sensor != null){
              this.sensorManager.flush(this); // sensor event listener
          }
          
      }

      @ReactMethod
      public void startTrigger() {
        if(this.sensor == null){
            return;
        }        
        boolean isWakeUpSensor = this.sensor.isWakeUpSensor();
        
        if(isWakeUpSensor){
            this.triggerListener = new CustomTriggerEventListener(this);
            this.sensorManager.requestTriggerSensor(triggerListener, this.sensor);
        }
      }

      @ReactMethod
      public void cancelTrigger() {
        if(this.sensor == null){
            return;
        }
        boolean isWakeUpSensor = this.sensor.isWakeUpSensor();
        if(isWakeUpSensor){
            this.sensorManager.cancelTriggerSensor(this.triggerListener,this.sensor);
        }
      }      
      


      @ReactMethod
      public void startDynamicSensor() {
        if(this.sensor == null){
            return;
        }        
        boolean isDynamicSensor = this.sensor.isDynamicSensor();
        if(isDynamicSensor){
            this.dynamicCallback = new CustomDynamicSensorCallback(this);
            if(handler != null){
                this.sensorManager.registerDynamicSensorCallback(this.dynamicCallback, handler);    
            } else {
                this.sensorManager.registerDynamicSensorCallback(this.dynamicCallback);
            }
        }
      }
      
      @ReactMethod
      public void stopDynamicSensor() {
        if(this.sensor == null){
            return;
        }        
        boolean isDynamicSensor = this.sensor.isDynamicSensor();
        if(isDynamicSensor){
            this.sensorManager.unregisterDynamicSensorCallback(this.dynamicCallback);              
        }
      }



      @ReactMethod
      public void startUpdates() {
        if (this.sensor == null){
            return;
        }
        if(handler != null){
            this.sensorManager.registerListener(this, sensor, this.samplingPeriodUs,handler);
        }else{
            this.sensorManager.registerListener(this, sensor, this.samplingPeriodUs);
        }                        
      }

      @ReactMethod
      public void stopUpdate() {
        this.sensorManager.unregisterListener(this,this.sensor);
      }

      @ReactMethod
      public void stopUpdates() {
        sensorManager.unregisterListener(this);
      }
    
 



      


      @ReactMethod
      public void getHighestDirectReportRateLevelIndex(Promise promise) {
          if (this.sensor == null) {
              // No sensor found, throw error
              promise.reject(new RuntimeException("No " + this.sensorName + " found"));
              return;
          }
          boolean isWakeup = this.sensor.isWakeUpSensor();
          promise.resolve(isWakeup);
      }
  

    @ReactMethod
    public void isTriggerSensor(Promise promise) {
        if (this.sensor == null) {
            // No sensor found, throw error
            promise.reject(new RuntimeException("No " + this.sensorName + " found"));
            return;
        }
        boolean isWakeup = this.sensor.isWakeUpSensor();
        promise.resolve(isWakeup);
    }


    @ReactMethod
    public void isAvailable(Promise promise) {
        if (this.sensor == null) {
            // No sensor found, throw error
            promise.reject(new RuntimeException("No " + this.sensorName + " found"));
            return;
        }
        promise.resolve(null);
    }

    // function to send event to react native
    private void sendEvent(String eventName, @Nullable WritableMap params) {
        try {
            this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
        } catch (RuntimeException e) {
            Log.e("ERROR", "java.lang.RuntimeException: Trying to invoke Javascript before CatalystInstance has been set!");
        }
    }
    // this is called by RN when the first listener is registered
    // not implementing this method will cause a warning on RN 0.65 onwards
    @ReactMethod
    public void addListener(String eventName) {
        this.listenerCount += 1;
    }

    // this is called by RN when the last listener is deregistered
    // not implementing this method will cause a warning on RN 0.65 onwards
    @ReactMethod
    public void removeListeners(Integer count) {
        this.listenerCount -= count;
        // If we no longer have listeners registered we should also probably also stop the sensor since the sensor events are essentially being dropped.
        if (this.sensorManager != null && this.listenerCount <= 0) {
        stopUpdates(); // maybe only calling `stopUpdates()` is enough
        }
    }



    /* TEMP */
    @ReactMethod
    public void _startTest() {
        if (this.sensor != null) {
            return;
        }
        int mode = sensor.getReportingMode();
        switch (mode) {
            case Sensor.REPORTING_MODE_CONTINUOUS:
                break;
            case Sensor.REPORTING_MODE_ONE_SHOT:
                break;
            case Sensor.REPORTING_MODE_ON_CHANGE:
                break;
            case Sensor.REPORTING_MODE_SPECIAL_TRIGGER:
                break;      
            default:
                return;
        }        
    }
        

    /* general sensor helpers   */

    private static double sensorTimestampToEpochMilliseconds(long elapsedTime) {
        // elapsedTime = The time in nanoseconds at which the event happened.
        return System.currentTimeMillis() + ((elapsedTime-SystemClock.elapsedRealtimeNanos())/1000000L);
    }


    /* sensor information helpers  */

    private void getDataFieldsDescriptions(WritableMap map, int sensorType){
    switch (sensorType) {
        case Sensor.TYPE_ACCELEROMETER:
            map.putString("x","Acceleration minus Gx on the x-axis");
            map.putString("y","Acceleration minus Gy on the y-axis");
            map.putString("z","Acceleration minus Gz on the z-axis");
            map.putString("z","Acceleration minus Gz on the z-axis");
            break;
        case Sensor.TYPE_ACCELEROMETER_LIMITED_AXES:
            break;
        case Sensor.TYPE_ACCELEROMETER_LIMITED_AXES_UNCALIBRATED:
        break;
        case Sensor.TYPE_ACCELEROMETER_UNCALIBRATED:
        break;
        case Sensor.TYPE_ALL:
        break;
        case Sensor.TYPE_AMBIENT_TEMPERATURE:
        break;
        case Sensor.TYPE_DEVICE_PRIVATE_BASE:
        break;
        case Sensor.TYPE_GAME_ROTATION_VECTOR:
        break;
        case Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR:
        break;
        case Sensor.TYPE_GRAVITY:
            break;
        case Sensor.TYPE_GYROSCOPE:
            break;
        case Sensor.TYPE_GYROSCOPE_LIMITED_AXES:
            break;
        case Sensor.TYPE_GYROSCOPE_LIMITED_AXES_UNCALIBRATED:
            break;
        case Sensor.TYPE_GYROSCOPE_UNCALIBRATED:
            break;
        case Sensor.TYPE_HEADING:
            break;
        case Sensor.TYPE_HEAD_TRACKER:
            break;
        case Sensor.TYPE_HEART_BEAT:
            break;
        case Sensor.TYPE_HEART_RATE:
            break;
        case Sensor.TYPE_HINGE_ANGLE:
            break;
        case Sensor.TYPE_LIGHT:
            break;
        case Sensor.TYPE_LINEAR_ACCELERATION:
            break;
        case Sensor.TYPE_LOW_LATENCY_OFFBODY_DETECT:
            break;
        case Sensor.TYPE_MAGNETIC_FIELD:
            break;
        case Sensor.TYPE_MAGNETIC_FIELD_UNCALIBRATED:
            break;
        case Sensor.TYPE_MOTION_DETECT:
            break;
        case Sensor.TYPE_ORIENTATION:
            break;
        case Sensor.TYPE_POSE_6DOF:
            break;
        case Sensor.TYPE_PRESSURE:
            break;
        case Sensor.TYPE_PROXIMITY:
            break;
        case Sensor.TYPE_RELATIVE_HUMIDITY:
            break;
        case Sensor.TYPE_ROTATION_VECTOR:
            break;
        case Sensor.TYPE_SIGNIFICANT_MOTION:
            break;
        case Sensor.TYPE_STATIONARY_DETECT:
            break;
        case Sensor.TYPE_STEP_COUNTER:
            break;
        case Sensor.TYPE_STEP_DETECTOR:
            break;
        case Sensor.TYPE_TEMPERATURE:
            break;
        default:
            break;
    }

}

    private String getSensorDescription(int sensorType) {
        switch (sensorType) {
            case Sensor.TYPE_ACCELEROMETER:
            return "Measures acceleration along the x, y, and z axes in m/s^2\n" +
                "values[0]: Acceleration minus Gx on the x-axis\n" +
                "values[1]: Acceleration minus Gy on the y-axis\n" +
                "values[2]: Acceleration minus Gz on the z-axis";
            case Sensor.TYPE_GRAVITY:
                return "Measures the force of gravity along the x, y, and z axes in m/s^2";
            case Sensor.TYPE_GYROSCOPE:
                return "Measures angular velocity around the x, y, and z axes in rad/s";
            case Sensor.TYPE_MAGNETIC_FIELD:
                return "Measures the ambient magnetic field along the x, y, and z axes in uT";
            case Sensor.TYPE_ROTATION_VECTOR:
                return "Represents the orientation of the device as a combination of an angle and an axis";
            case Sensor.TYPE_ORIENTATION:
                return "Measures the azimuth, pitch, and roll angles in degrees";
            default:
                return null;
        }
    }
    
    private String getSensorUnit(int sensorType) {
        switch (sensorType) {
            case Sensor.TYPE_ACCELEROMETER:
            case Sensor.TYPE_GRAVITY:
            case Sensor.TYPE_LINEAR_ACCELERATION:
                return "meter/second^2";
            case Sensor.TYPE_ACCELEROMETER_LIMITED_AXES:
                break;
            case Sensor.TYPE_ACCELEROMETER_LIMITED_AXES_UNCALIBRATED:
                break;
            case Sensor.TYPE_ACCELEROMETER_UNCALIBRATED:
                break;
            case Sensor.TYPE_ALL:
                break;
            case Sensor.TYPE_AMBIENT_TEMPERATURE:
                break;
            case Sensor.TYPE_DEVICE_PRIVATE_BASE:
                break;
            case Sensor.TYPE_GAME_ROTATION_VECTOR:
                break;
            case Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR:
                break;
            case Sensor.TYPE_GYROSCOPE:
                return "radians/second";         
            case Sensor.TYPE_GYROSCOPE_LIMITED_AXES:
                break;
            case Sensor.TYPE_GYROSCOPE_LIMITED_AXES_UNCALIBRATED:
                break;
            case Sensor.TYPE_GYROSCOPE_UNCALIBRATED:
                break;
            case Sensor.TYPE_HEADING:
                break;
            case Sensor.TYPE_HEAD_TRACKER:
                break;
            case Sensor.TYPE_HEART_BEAT:
                break;  
            case Sensor.TYPE_HEART_RATE:
                break;
            case Sensor.TYPE_HINGE_ANGLE:
                break;  
            case Sensor.TYPE_LIGHT:
                return "lux";


            case Sensor.TYPE_LOW_LATENCY_OFFBODY_DETECT:
                break;
            case Sensor.TYPE_MAGNETIC_FIELD:
                return "uT";
            case Sensor.TYPE_MAGNETIC_FIELD_UNCALIBRATED:
                break;
            case Sensor.TYPE_MOTION_DETECT:
                break;
            case Sensor.TYPE_ORIENTATION:
                break;
            case Sensor.TYPE_POSE_6DOF:
                break;
            case Sensor.TYPE_PRESSURE:
                return "millibar";
            case Sensor.TYPE_PROXIMITY:
                return "centimeters";
            case Sensor.TYPE_RELATIVE_HUMIDITY:
                break;
            case Sensor.TYPE_ROTATION_VECTOR:
                break;
            case Sensor.TYPE_SIGNIFICANT_MOTION:
                break;
            case Sensor.TYPE_STATIONARY_DETECT:
                break;
            case Sensor.TYPE_STEP_COUNTER:
                break;
            case Sensor.TYPE_STEP_DETECTOR:
                break;
            case Sensor.TYPE_TEMPERATURE:
                break;
            default:
                break;
        }
        return null;
    }

    private void getFieldsDescriptions(WritableMap map,int sensorType){
        switch (sensorType) {
            case Sensor.TYPE_ACCELEROMETER:
                break;
            case Sensor.TYPE_ACCELEROMETER_LIMITED_AXES:
                break;
            case Sensor.TYPE_ACCELEROMETER_LIMITED_AXES_UNCALIBRATED:
                break;
            case Sensor.TYPE_ACCELEROMETER_UNCALIBRATED:
                break;
            case Sensor.TYPE_ALL:
                break;
            case Sensor.TYPE_AMBIENT_TEMPERATURE:
                break;
            case Sensor.TYPE_DEVICE_PRIVATE_BASE:
                break;
            case Sensor.TYPE_GAME_ROTATION_VECTOR:
                break;
            case Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR:
                break;
            case Sensor.TYPE_GRAVITY:
                break;
            case Sensor.TYPE_GYROSCOPE:
                break;
            case Sensor.TYPE_GYROSCOPE_LIMITED_AXES:
                break;
            case Sensor.TYPE_GYROSCOPE_LIMITED_AXES_UNCALIBRATED:
                break;
            case Sensor.TYPE_GYROSCOPE_UNCALIBRATED:
                break;
            case Sensor.TYPE_HEADING:
                break;
            case Sensor.TYPE_HEAD_TRACKER:
                break;
            case Sensor.TYPE_HEART_BEAT:
                break;
            case Sensor.TYPE_HEART_RATE:
                break;
            case Sensor.TYPE_HINGE_ANGLE:
                break;
            case Sensor.TYPE_LIGHT:
                break;
            case Sensor.TYPE_LINEAR_ACCELERATION:
                break;
            case Sensor.TYPE_LOW_LATENCY_OFFBODY_DETECT:
                break;
            case Sensor.TYPE_MAGNETIC_FIELD:
                break;
            case Sensor.TYPE_MAGNETIC_FIELD_UNCALIBRATED:
                break;
            case Sensor.TYPE_MOTION_DETECT:
                break;
            case Sensor.TYPE_ORIENTATION:
                break;
            case Sensor.TYPE_POSE_6DOF:
                break;
            case Sensor.TYPE_PRESSURE:
                break;
            case Sensor.TYPE_PROXIMITY:
                break;
            case Sensor.TYPE_RELATIVE_HUMIDITY:
                break;
            case Sensor.TYPE_ROTATION_VECTOR:
                break;
            case Sensor.TYPE_SIGNIFICANT_MOTION:
                break;
            case Sensor.TYPE_STATIONARY_DETECT:
                break;
            case Sensor.TYPE_STEP_COUNTER:
                break;
            case Sensor.TYPE_STEP_DETECTOR:
                break;
            case Sensor.TYPE_TEMPERATURE:
                break;
            default:
                break;
        }

    }

    private String getHighestDirectReportRateLevel() {
        if (this.sensor != null) {
            return null;
        }
        int rate = sensor.getHighestDirectReportRateLevel();
        switch (rate) {
            case SensorDirectChannel.RATE_STOP:
                return "RATE_STOP";        
            case SensorDirectChannel.RATE_NORMAL:
                return "RATE_NORMAL";
            case SensorDirectChannel.RATE_FAST:
                return "RATE_FAST";
            case SensorDirectChannel.RATE_VERY_FAST:
                return "RATE_VERY_FAST";        
            default:
                return null;
        }
    }

    private String getReportingMode() {
        if (this.sensor != null) {
            return null;
        }
        int mode = sensor.getReportingMode();
        switch (mode) {
            case Sensor.REPORTING_MODE_CONTINUOUS:
                return "REPORTING_MODE_CONTINUOUS";
            case Sensor.REPORTING_MODE_ONE_SHOT:
                return "REPORTING_MODE_ONE_SHOT";
            case Sensor.REPORTING_MODE_ON_CHANGE:
                return "REPORTING_MODE_ON_CHANGE";
            case Sensor.REPORTING_MODE_SPECIAL_TRIGGER:
                return "REPORTING_MODE_SPECIAL_TRIGGER";        
            default:
                return null;
        }
    }

    private String getType() {
        if (this.sensor != null) {
            return null;
        }
        int type = sensor.getType();      
        switch (type) {
            case Sensor.TYPE_ACCELEROMETER:
                return "TYPE_ACCELEROMETER";
            case Sensor.TYPE_ACCELEROMETER_LIMITED_AXES:
                return "TYPE_ACCELEROMETER_LIMITED_AXES";
            case Sensor.TYPE_ACCELEROMETER_LIMITED_AXES_UNCALIBRATED:
                return "TYPE_ACCELEROMETER_LIMITED_AXES_UNCALIBRATED";
            case Sensor.TYPE_ACCELEROMETER_UNCALIBRATED:
                return "TYPE_ACCELEROMETER_UNCALIBRATED";
            case Sensor.TYPE_ALL:
                return "TYPE_ALL";
            case Sensor.TYPE_AMBIENT_TEMPERATURE:
                return "TYPE_AMBIENT_TEMPERATURE";
            case Sensor.TYPE_DEVICE_PRIVATE_BASE:
                return "TYPE_DEVICE_PRIVATE_BASE";
            case Sensor.TYPE_GAME_ROTATION_VECTOR:
                return "TYPE_GAME_ROTATION_VECTOR";
            case Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR:
                return "TYPE_GEOMAGNETIC_ROTATION_VECTOR";
            case Sensor.TYPE_GRAVITY:
                return "TYPE_GRAVITY";
            case Sensor.TYPE_GYROSCOPE:
                return "TYPE_GYROSCOPE";
            case Sensor.TYPE_GYROSCOPE_LIMITED_AXES:
                return "TYPE_GYROSCOPE_LIMITED_AXES";
            case Sensor.TYPE_GYROSCOPE_LIMITED_AXES_UNCALIBRATED:
                return "TYPE_GYROSCOPE_LIMITED_AXES_UNCALIBRATED";
            case Sensor.TYPE_GYROSCOPE_UNCALIBRATED:
                return "TYPE_GYROSCOPE_UNCALIBRATED";
            case Sensor.TYPE_HEADING:
                return "TYPE_HEADING";
            case Sensor.TYPE_HEAD_TRACKER:
                return "TYPE_HEAD_TRACKER";
            case Sensor.TYPE_HEART_BEAT:
                return "TYPE_HEART_BEAT";
            case Sensor.TYPE_HEART_RATE:
                return "TYPE_HEART_RATE";
            case Sensor.TYPE_HINGE_ANGLE:
                return "TYPE_HINGE_ANGLE";
            case Sensor.TYPE_LIGHT:
                return "TYPE_LIGHT";
            case Sensor.TYPE_LINEAR_ACCELERATION:
                return "TYPE_LINEAR_ACCELERATION";
            case Sensor.TYPE_LOW_LATENCY_OFFBODY_DETECT:
                return "TYPE_LOW_LATENCY_OFFBODY_DETECT";
            case Sensor.TYPE_MAGNETIC_FIELD:
                return "TYPE_MAGNETIC_FIELD";
            case Sensor.TYPE_MAGNETIC_FIELD_UNCALIBRATED:
                return "TYPE_MAGNETIC_FIELD_UNCALIBRATED";
            case Sensor.TYPE_MOTION_DETECT:
                return "TYPE_MOTION_DETECT";
            case Sensor.TYPE_ORIENTATION:
                return "TYPE_ORIENTATION";
            case Sensor.TYPE_POSE_6DOF:
                return "TYPE_POSE_6DOF";
            case Sensor.TYPE_PRESSURE:
                return "TYPE_PRESSURE";
            case Sensor.TYPE_PROXIMITY:
                return "TYPE_PROXIMITY";
            case Sensor.TYPE_RELATIVE_HUMIDITY:
                return "TYPE_RELATIVE_HUMIDITY";
            case Sensor.TYPE_ROTATION_VECTOR:
                return "TYPE_ROTATION_VECTOR";
            case Sensor.TYPE_SIGNIFICANT_MOTION:
                return "TYPE_SIGNIFICANT_MOTION";
            case Sensor.TYPE_STATIONARY_DETECT:
                return "TYPE_STATIONARY_DETECT";
            case Sensor.TYPE_STEP_COUNTER:
                return "TYPE_STEP_COUNTER";
            case Sensor.TYPE_STEP_DETECTOR:
                return "TYPE_STEP_DETECTOR";
            case Sensor.TYPE_TEMPERATURE:
                return "TYPE_TEMPERATURE";
            default:
                return null;
        }

    }

    private String getTypeBySensorType() {
        switch (this.sensorType) {
            case Sensor.TYPE_ACCELEROMETER:
                return "TYPE_ACCELEROMETER";
            case Sensor.TYPE_ACCELEROMETER_LIMITED_AXES:
                return "TYPE_ACCELEROMETER_LIMITED_AXES";
            case Sensor.TYPE_ACCELEROMETER_LIMITED_AXES_UNCALIBRATED:
                return "TYPE_ACCELEROMETER_LIMITED_AXES_UNCALIBRATED";
            case Sensor.TYPE_ACCELEROMETER_UNCALIBRATED:
                return "TYPE_ACCELEROMETER_UNCALIBRATED";
            case Sensor.TYPE_ALL:
                return "TYPE_ALL";
            case Sensor.TYPE_AMBIENT_TEMPERATURE:
                return "TYPE_AMBIENT_TEMPERATURE";
            case Sensor.TYPE_DEVICE_PRIVATE_BASE:
                return "TYPE_DEVICE_PRIVATE_BASE";
            case Sensor.TYPE_GAME_ROTATION_VECTOR:
                return "TYPE_GAME_ROTATION_VECTOR";
            case Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR:
                return "TYPE_GEOMAGNETIC_ROTATION_VECTOR";
            case Sensor.TYPE_GRAVITY:
                return "TYPE_GRAVITY";
            case Sensor.TYPE_GYROSCOPE:
                return "TYPE_GYROSCOPE";
            case Sensor.TYPE_GYROSCOPE_LIMITED_AXES:
                return "TYPE_GYROSCOPE_LIMITED_AXES";
            case Sensor.TYPE_GYROSCOPE_LIMITED_AXES_UNCALIBRATED:
                return "TYPE_GYROSCOPE_LIMITED_AXES_UNCALIBRATED";
            case Sensor.TYPE_GYROSCOPE_UNCALIBRATED:
                return "TYPE_GYROSCOPE_UNCALIBRATED";
            case Sensor.TYPE_HEADING:
                return "TYPE_HEADING";
            case Sensor.TYPE_HEAD_TRACKER:
                return "TYPE_HEAD_TRACKER";
            case Sensor.TYPE_HEART_BEAT:
                return "TYPE_HEART_BEAT";
            case Sensor.TYPE_HEART_RATE:
                return "TYPE_HEART_RATE";
            case Sensor.TYPE_HINGE_ANGLE:
                return "TYPE_HINGE_ANGLE";
            case Sensor.TYPE_LIGHT:
                return "TYPE_LIGHT";
            case Sensor.TYPE_LINEAR_ACCELERATION:
                return "TYPE_LINEAR_ACCELERATION";
            case Sensor.TYPE_LOW_LATENCY_OFFBODY_DETECT:
                return "TYPE_LOW_LATENCY_OFFBODY_DETECT";
            case Sensor.TYPE_MAGNETIC_FIELD:
                return "TYPE_MAGNETIC_FIELD";
            case Sensor.TYPE_MAGNETIC_FIELD_UNCALIBRATED:
                return "TYPE_MAGNETIC_FIELD_UNCALIBRATED";
            case Sensor.TYPE_MOTION_DETECT:
                return "TYPE_MOTION_DETECT";
            case Sensor.TYPE_ORIENTATION:
                return "TYPE_ORIENTATION";
            case Sensor.TYPE_POSE_6DOF:
                return "TYPE_POSE_6DOF";
            case Sensor.TYPE_PRESSURE:
                return "TYPE_PRESSURE";
            case Sensor.TYPE_PROXIMITY:
                return "TYPE_PROXIMITY";
            case Sensor.TYPE_RELATIVE_HUMIDITY:
                return "TYPE_RELATIVE_HUMIDITY";
            case Sensor.TYPE_ROTATION_VECTOR:
                return "TYPE_ROTATION_VECTOR";
            case Sensor.TYPE_SIGNIFICANT_MOTION:
                return "TYPE_SIGNIFICANT_MOTION";
            case Sensor.TYPE_STATIONARY_DETECT:
                return "TYPE_STATIONARY_DETECT";
            case Sensor.TYPE_STEP_COUNTER:
                return "TYPE_STEP_COUNTER";
            case Sensor.TYPE_STEP_DETECTOR:
                return "TYPE_STEP_DETECTOR";
            case Sensor.TYPE_TEMPERATURE:
                return "TYPE_TEMPERATURE";
            default:
                return null;
        }

    }



    protected static void putIntoMap(WritableMap map, String key, Object value) {
        if (value instanceof Integer) {
            map.putInt(key, (Integer) value);
        } else if (value instanceof Long) {
            map.putInt(key, ((Long) value).intValue());
        } else if (value instanceof Float) {
            map.putDouble(key, (Float) value);
        } else if (value instanceof Double) {
            map.putDouble(key, (Double) value);
        } else if (value instanceof String) {
            map.putString(key, (String) value);
        } else if (value instanceof Boolean) {
            map.putBoolean(key, (Boolean) value);
        } else if (value instanceof int[]
                || value instanceof long[]
                || value instanceof double[]
                || value instanceof String[]
                || value instanceof boolean[]) {
            map.putArray(key,  Arguments.fromArray(value));
        } else if (value instanceof WritableMap){
            map.putMap(key, (WritableMap) value);
        } else {
            map.putNull(key);
        }
    }

    /* WritableMap react native helpers */

    private void addToMap(WritableMap map,String fieldName,WritableArray fieldValue){
        if (fieldValue != null) {
            map.putArray(fieldName, fieldValue);
        }else{
            map.putNull(fieldName);
        }
    }

    private void addToMap(WritableMap map,String fieldName, WritableMap fieldValue){
        if (fieldValue != null) {
            map.putMap(fieldName, fieldValue);
        }else{
            map.putNull(fieldName);
        }
    }

    private void addToMap(WritableMap map,String fieldName,Double fieldValue){
        if (fieldValue != null) {
            map.putDouble(fieldName, fieldValue);
        }else{
            map.putNull(fieldName);
        }
    }

    private void addToMap(WritableMap map,String fieldName,Float fieldValue){
        if (fieldValue != null) {
            double d = fieldValue;
            map.putDouble(fieldName, d);
        }else{
            map.putNull(fieldName);
        }
    }

    private void addToMap(WritableMap map,String fieldName,Integer fieldValue){
        if (fieldValue != null) {
            map.putInt(fieldName, fieldValue);
        }else{
            map.putNull(fieldName);
        }
    }

    private void addToMap(WritableMap map,String fieldName,Boolean fieldValue){
        if (fieldValue != null) {
            map.putBoolean(fieldName, fieldValue);
        }else{
            map.putNull(fieldName);
        }
    }

    private void addToMap(WritableMap map,String fieldName,String fieldValue){
        if (fieldValue != null) {
            map.putString(fieldName, fieldValue);
        }else{
            map.putNull(fieldName);
        }
    }





}


