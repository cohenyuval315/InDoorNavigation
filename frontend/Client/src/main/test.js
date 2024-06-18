// import { combineLatest, interval, merge, race } from 'rxjs';
// import { bufferCount, bufferTime, catchError, filter, map, mergeAll, repeat, scan, share, shareReplay, skip, startWith, take, timestamp, toArray, window, windowCount } from 'rxjs/operators';
// import { timingSlidingWindow } from '../streams/utils';
// import { combineSlices } from '@reduxjs/toolkit';
// console.log("TEST");

// const acc = interval(2000).pipe(
//   share(),
//   timestamp(),
//   // startWith({ stream: 'mag',value:[]}),
//   map(() => Math.random().toFixed(0)), // Replace with actual accelerometer data source
//   bufferCount(5, 1),
//   map(values => ({ stream: 'acc', value: values }))
// )
// const withLatestFromTimestamp = (sensor$, sensorName) =>
//   sensor$.pipe(
//     map((value) => ({ sensorName, value, timestamp: Date.now() }))
//   );
// const mag = interval(2000).pipe(
//   share(),
//   timestamp(),
//   // startWith({ stream: 'mag',value:null}),
//   map(() => ({ stream: 'mag', value:Math.random().toFixed(0)})),
// ); 
// const mag2 = interval(2000).pipe(
//   share(),
// ).pipe(startWith({value:null,timestamp:0,sensorName:"mag"})).pipe(
//     map((value) => ({ sensorName:"mag", value, timestamp: Date.now() }))
// )

// const mag3 = interval(2000).pipe(
//   share(),
// ).pipe(startWith({value:null,timestamp:0,sensorName:"mag2"})).pipe(
//     map((value) => ({ sensorName:"mag2", value, timestamp: Date.now() }))
// )

// const mag4 = interval(5000).pipe(
//   share(),
// ).pipe(startWith({value:null,timestamp:0,sensorName:"mag4"})).pipe(
//     map((value) => ({ sensorName:"mag4", value, timestamp: Date.now() }))
// )

// const gyro = interval(2000).pipe(
//   share(),
//   // startWith({ stream: 'mag',value:null}),
//   map(() => ({ stream: 'gyro', value:Math.random().toFixed(0)})),
//   ); 

// const wifi = interval(5000).pipe(
//   share(),
//   // startWith({ stream: 'mag',value:null}),
//   map(() => ({ stream: 'WIFI', value:Math.random().toFixed(0)})),
// ); // Example data source (mocked with interval)
// const gps = interval(1000).pipe(
//   share(),
//   timestamp(),
//   map((value) => ({ stream: 'GPS', timestamp:value.timestamp, value:value.value})),
  
//   startWith({ stream: 'GPS', timestamp:0, value:99}),
  
// ).pipe(take(10));
// // gps.subscribe({next:(d) => console.log(d)})



// // const combinedStream = combineLatest([
// //   acc,
// //   mag,
// //   gyro,
// //   wifi,
// //   gps
// // ]).pipe(
// //   map(([accData, magData, gyroData, wifiData, gpsData]) => {
// //     // Handle data as needed
// //     const result = {
// //       acc: accData,
// //       mag: magData,
// //       gyro: gyroData,
// //       wifi: wifiData,
// //       gps: gpsData !== null ? gpsData : 'GPS not available'
// //     };
// //     return result;
// //   })
// // );

// const combinedStream = merge([
//   acc,
//   mag,
//   gyro,
//   wifi,
//   gps
// ]).pipe(
//   scan((acc, t) => {
//     // Handle data as needed
//     // console.log("blublu:",t)
//     acc[stream] = {value,timestamp};
//     return acc;
//   },{})
// ).pipe(catchError(err => console.log(err)))


// // combinedStream.subscribe(combinedData => {
// //   // console.log('\n\nCombined Data:', combinedData);
// // });


// const combinedSensors$ = merge(
//   mag2,
//   mag3,
//   mag4,
// ).pipe(
//   bufferTime(2000),
//   map((buffer) => {
//     // Create a dictionary of the latest values
//     // console.log("vyf:",buffer)
//     const latestValues = buffer.reduce((acc, data) => {
//       const { sensorName,value, timestamp } = data;
//       acc[sensorName] = data
//       return acc
//     }, {});

//     // Extract the latest values
//     return {
//       // rotVector: latestValues.rotVector?.value,
//       // gravity: latestValues.gravity?.value,
//       // linearAcc: latestValues.linearAcc?.value,
//       // acc: latestValues.acc?.value,
//       // gyro: latestValues.gyro?.value,
//       // mag: latestValues.mag?.value,
//       // wifi: latestValues.wifi?.value,
//       // gps: latestValues.gps?.value
//           mag: latestValues?.mag,
//        mag2: latestValues?.mag2,
//        mag4: latestValues?.mag4,
//     };
//   }),
//   // scan((acc, { sensorName, value, timestamp }) => {
//   //   acc[sensorName] = { value, timestamp };
//   //   return acc;
//   // }, {}),
//   // map((latestValues) => ({
//   //   mag: latestValues.mag?.value,
//   //   mag2: latestValues.mag2?.value,

//   // }))
// );


// combinedSensors$.subscribe((data) => {
//   console.log('Combined sensor data:', data);
//   // Process the combined sensor data here
// });