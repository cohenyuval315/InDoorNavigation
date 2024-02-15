// import android.content.Context;
// import android.hardware.Sensor;
// import android.hardware.SensorEvent;
// import android.hardware.SensorEventListener;
// import android.hardware.SensorManager;
// import android.util.Log;

// public class Sensors {
//     private SensorManager sensorManager;
//     private Sensor accelerometer;
//     private Sensor gyroscope;

//     public Sensors(Context context) {
//         // Initialize SensorManager
//         sensorManager = (SensorManager) context.getSystemService(Context.SENSOR_SERVICE);

//         // Initialize specific sensors (e.g., accelerometer and gyroscope)
//         accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
//         gyroscope = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);

//         // Check if sensors are available
//         if (accelerometer == null) {
//             Log.e("Sensors", "Accelerometer not available");
//         }
//         if (gyroscope == null) {
//             Log.e("Sensors", "Gyroscope not available");
//         }
//     }

//     // Register sensor listeners
//     public void registerSensors() {
//         if (accelerometer != null) {
//             sensorManager.registerListener(accelerometerListener, accelerometer, SensorManager.SENSOR_DELAY_NORMAL);
//         }

//         if (gyroscope != null) {
//             sensorManager.registerListener(gyroscopeListener, gyroscope, SensorManager.SENSOR_DELAY_NORMAL);
//         }
//     }

//     // Unregister sensor listeners when no longer needed
//     public void unregisterSensors() {
//         sensorManager.unregisterListener(accelerometerListener);
//         sensorManager.unregisterListener(gyroscopeListener);
//     }

//     // Accelerometer listener
//     private final SensorEventListener accelerometerListener = new SensorEventListener() {
//         @Override
//         public void onSensorChanged(SensorEvent event) {
//             // Handle accelerometer data
//             float x = event.values[0];
//             float y = event.values[1];
//             float z = event.values[2];

//             Log.d("Accelerometer", "X: " + x + ", Y: " + y + ", Z: " + z);
//         }

//         @Override
//         public void onAccuracyChanged(Sensor sensor, int accuracy) {
//             // Handle accuracy changes if needed
//         }
//     };

//     // Gyroscope listener
//     private final SensorEventListener gyroscopeListener = new SensorEventListener() {
//         @Override
//         public void onSensorChanged(SensorEvent event) {
//             // Handle gyroscope data
//             float x = event.values[0];
//             float y = event.values[1];
//             float z = event.values[2];

//             Log.d("Gyroscope", "X: " + x + ", Y: " + y + ", Z: " + z);
//         }

//         @Override
//         public void onAccuracyChanged(Sensor sensor, int accuracy) {
//             // Handle accuracy changes if needed
//         }
//     };
// }
