

export const globalCoordinatesToFloats = (globalCoordinates) => {
    return {
        latitude: parseFloat(parseFloat(globalCoordinates.latitude).toFixed(20)), 
        longitude: parseFloat(parseFloat(globalCoordinates.longitude).toFixed(20)) 
    }

    
}


export const mapGlobalCoordinatesToFloats = (globalCoordinates) => {
    return Object.fromEntries(
        Object.entries(globalCoordinates).map(([key, values]) => {
          return [
            key,
            {
              latitude: parseFloat(parseFloat(values.latitude).toFixed(20)),
              longitude: parseFloat(parseFloat(values.longitude).toFixed(20))
            }
          ];
        })
    );
}

export const getRelativeGlobalCoordinates = (mapGlobalCoordinates) => {
    const floatCoordinates = mapGlobalCoordinatesToFloats(mapGlobalCoordinates)
    const topXDiff = floatCoordinates.topRight.longitude - floatCoordinates.topLeft.longitude;
    const bottomXDiff = floatCoordinates.bottomRight.longitude - floatCoordinates.bottomLeft.longitude;
    const xDiff = (topXDiff + bottomXDiff) / 2;
    
    const leftYDiff = floatCoordinates.topLeft.latitude - floatCoordinates.bottomLeft.latitude;
    const rightYDiff = floatCoordinates.topRight.latitude - floatCoordinates.bottomRight.latitude;
    const yDiff = (leftYDiff + rightYDiff) / 2;

    const relativeCoordinates = {
        topLeft:{
            x:0,
            y:yDiff,
            latitude:floatCoordinates.topLeft.latitude,
            longitude:floatCoordinates.topLeft.longitude
        },
        topRight:{
            x:xDiff,
            y:yDiff,
            latitude:floatCoordinates.topRight.latitude,
            longitude:floatCoordinates.topRight.longitude
        },
        bottomRight:{
            x:xDiff,
            y:0,
            latitude:floatCoordinates.bottomRight.latitude,
            longitude:floatCoordinates.bottomRight.longitude
        },
        bottomLeft:{
            x:0,
            y:0,
            latitude:floatCoordinates.bottomLeft.latitude,
            longitude:floatCoordinates.bottomLeft.longitude
        }
    }
    return relativeCoordinates;
}


export function getRelativePointByGlobalCoordinatesAndMapGlobalCoordinates(globalCoordinates,mapRelativeCoordinatesData){
    const xDiffTop = globalCoordinates.longitude - mapRelativeCoordinatesData.bottomLeft.longitude;
    const xDiffBottom = globalCoordinates.longitude - mapRelativeCoordinatesData.topLeft.longitude;
    let itemX = (xDiffTop + xDiffBottom) / 2;   
    if(itemX < 0){
        itemX = 0;
    }    
    const maxX = (mapRelativeCoordinatesData.topRight.longitude + mapRelativeCoordinatesData.bottomRight.longitude) / 2

    if(itemX > maxX){
        itemX = maxX;
    }
    const yDiffRight = globalCoordinates.latitude - mapRelativeCoordinatesData.bottomRight.latitude;
    const yDffLeft = globalCoordinates.latitude - mapRelativeCoordinatesData.bottomLeft.latitude;
    let itemY = (yDiffRight + yDffLeft) / 2;   
    if(itemY < 0){
        itemY = 0;
    }    
    const maxY = (mapRelativeCoordinatesData.topRight.latitude + mapRelativeCoordinatesData.topLeft.latitude) / 2
    if(itemY > maxY){
        itemY = maxY;
    }
    return {
        x:itemX,
        y:itemY
    }  
}


export const getPointInMapBySize = (point,topRightPoint,width,height) => {
    return {
        x: (point.x / topRightPoint.x) * width,
        y: (point.y / topRightPoint.y) * height
    }
}