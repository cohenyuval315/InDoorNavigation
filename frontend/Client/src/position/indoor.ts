// setBuildingBoundary(buildingBoundaryBox:any){
//     this.buildingBoundaryBox = buildingBoundaryBox;
// }

// calculateInitialPosition(buildingBoundaryBox:any){ 
    
// }


// private calculateNextPosition(geoData: any, magnetoData: any, accelData: any[]): UserIndoorPosition {
//     // Replace this with actual calculation logic
//     const avgAccel = accelData.reduce((acc, val) => ({
//         x: acc.x + val.x,
//         y: acc.y + val.y,
//         z: acc.z + val.z
//     }), { x: 0, y: 0, z: 0 });

//     return {
//         x: (geoData.x + magnetoData.x + avgAccel.x) / 3,
//         y: (geoData.y + magnetoData.y + avgAccel.y) / 3,
//         z: (geoData.z + magnetoData.z + avgAccel.z) / 3,
//         floor: geoData.floor // Example placeholder
//     };
// }

// private calculateNextPositionGPS(value:GeolocationResponse | null){
//     if (value === null) {
//         return { x: 0, y: 0, z: 0, floor: 0 };
//     }
//     const pos = {
//         latitude:value.coords.latitude,
//         longitude:value.coords.longitude,
//     }
//     const {x,y} = getRelativeGeoCoordinates(this.buildingBoundaryBox,pos);
//     return {
//         x:x,
//         y:y,
//         z:0,
//         floor:0,
//     }
// }