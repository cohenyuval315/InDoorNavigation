

export const globalCoordinatesToFloats = (globalCoordinates) => {
    return {
        latitude: parseFloat(parseFloat(globalCoordinates.latitude).toFixed(20)), 
        longitude: parseFloat(parseFloat(globalCoordinates.longitude).toFixed(20)) 
    }

    
}


export const mapGlobalCoordinatesToFloats = (globalCoordinates) => {
    return globalCoordinates.map((coords) => {
        return globalCoordinatesToFloats(coords);
    })
}

export const getGeoLocationBoundaryBox = (globalCoordinates) => {
    const floatCoordinates = mapGlobalCoordinatesToFloats(globalCoordinates);
    const minLatitude = Math.min(...floatCoordinates.map(coord => coord.latitude));
    const maxLatitude = Math.max(...floatCoordinates.map(coord => coord.latitude));
    const minLongitude = Math.min(...floatCoordinates.map(coord => coord.longitude));
    const maxLongitude = Math.max(...floatCoordinates.map(coord => coord.longitude));
    return {
        minLatitude,
        maxLatitude,
        minLongitude,
        maxLongitude,
    }
}

export const getRelatvieGeoLocationBoundaryBox = (globalCoordinates) => {
    const minLatitude = Math.min(...globalCoordinates.map(coord => coord.latitude));
    const maxLatitude = Math.max(...globalCoordinates.map(coord => coord.latitude));
    const minLongitude = Math.min(...globalCoordinates.map(coord => coord.longitude));
    const maxLongitude = Math.max(...globalCoordinates.map(coord => coord.longitude));

    return {
        minLatitude,
        maxLatitude,
        minLongitude,
        maxLongitude,
    }

}

export const isPointInBoundaryBox = (geoLocationBoundaryBox, targetCoordinates) => {
    const { minLatitude, maxLatitude, minLongitude, maxLongitude } = geoLocationBoundaryBox;
    const { latitude, longitude } = targetCoordinates;

    const isWithinLatitude = latitude >= minLatitude && latitude <= maxLatitude;
    const isWithinLongitude = longitude >= minLongitude && longitude <= maxLongitude;

    if (isWithinLatitude && isWithinLongitude) {
        return targetCoordinates;
    } else {
        return null;
    }
}

export const getRelativeGeoCoordinates = (geoLocationBoundaryBox,targetCoordinates) => {
    const targetCoords = isPointInBoundaryBox(geoLocationBoundaryBox,targetCoordinates)
    if(!targetCoords){
        return null;
    }
    
    const {minLatitude,
        maxLatitude,
        minLongitude,
        maxLongitude} = getRelatvieGeoLocationBoundaryBox(geoLocationBoundaryBox);

    const x = 100 * (targetCoordinates.longitude - minLongitude) / (maxLongitude - minLongitude);
    const y = 100 * (1 - (targetCoordinates.latitude - minLatitude) / (maxLatitude - minLatitude));

    return { x, y };    
}

export const getRelativeGlobalCoordinates = (geoLocationBoundaryBox,targetCoordinates) => {
    // invert lantitude since it y goes down as we go down unlike our cordinates
    const {minLatitude,
        maxLatitude,
        minLongitude,
        maxLongitude} = geoLocationBoundaryBox;
    
    const x = 100 * (targetCoordinates.longitude - minLongitude) / (maxLongitude - minLongitude);
    const y = 100 * (1 - (targetCoordinates.latitude - minLatitude) / (maxLatitude - minLatitude)); 

    return { x, y };    
}


// export function getRelativePointByGlobalCoordinatesAndMapGlobalCoordinates(globalCoordinates,mapRelativeCoordinatesData){
//     const xDiffTop = globalCoordinates.longitude - mapRelativeCoordinatesData.bottomLeft.longitude;
//     const xDiffBottom = globalCoordinates.longitude - mapRelativeCoordinatesData.topLeft.longitude;
//     let itemX = (xDiffTop + xDiffBottom) / 2;   
//     if(itemX < 0){
//         itemX = 0;
//     }    
//     const maxX = (mapRelativeCoordinatesData.topRight.longitude + mapRelativeCoordinatesData.bottomRight.longitude) / 2

//     if(itemX > maxX){
//         itemX = maxX;
//     }
//     const yDiffRight = globalCoordinates.latitude - mapRelativeCoordinatesData.bottomRight.latitude;
//     const yDffLeft = globalCoordinates.latitude - mapRelativeCoordinatesData.bottomLeft.latitude;
//     let itemY = (yDiffRight + yDffLeft) / 2;   
//     if(itemY < 0){
//         itemY = 0;
//     }    
//     const maxY = (mapRelativeCoordinatesData.topRight.latitude + mapRelativeCoordinatesData.topLeft.latitude) / 2
//     if(itemY > maxY){
//         itemY = maxY;
//     }
//     return {
//         x:itemX,
//         y:itemY
//     }  
// }


// export const getPointInMapBySize = (point,topRightPoint,width,height) => {
//     return {
//         x: (point.x / topRightPoint.x) * width,
//         y: (point.y / topRightPoint.y) * height
//     }
// }