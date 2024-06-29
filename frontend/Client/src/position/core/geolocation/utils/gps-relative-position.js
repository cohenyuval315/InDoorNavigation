export function calculateRelativeGeoPosition(newPoint, areaCoords) {
    // Assuming newPoint is in {latitude, longitude} format
    let newLat = newPoint.latitude;
    let newLon = newPoint.longitude;
    
    // Top left coordinates
    let tlLat = areaCoords[0].latitude;
    let tlLon = areaCoords[0].longitude;
    
    // Calculate relative position
    let relLat = (newLat - tlLat) / (areaCoords[2].latitude - tlLat);
    let relLon = (newLon - tlLon) / (areaCoords[1].longitude - tlLon);
    
    // Convert to percentage
    let x = relLon * 100;
    let y = relLat * 100;

    // Ensure values are within [0, 100]
    if (y > 100) {
        y = 100;
    }
    if (y < 0) {
        y = 0;
    }
    if (x > 100) {
        x = 100;
    }
    if (x < 0) {
        x = 0;
    }

    return {
        // relative_latitude_percent: relLat * 100,
        // relative_longitude_percent: relLon * 100,
        x: x,
        y: y
    };
}
