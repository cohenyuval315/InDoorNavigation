export function calculateRelativeGeoPosition(newPoint, areaCoords) {
    // Assuming newPoint is in {latitude, longitude} format
    let newLat = newPoint.latitude;
    let newLon = newPoint.longitude;
    
    // Extract corner coordinates
    let tlLat = areaCoords[0].latitude;
    let tlLon = areaCoords[0].longitude;
    
    let trLat = areaCoords[1].latitude;
    let trLon = areaCoords[1].longitude;
    
    let blLat = areaCoords[2].latitude;
    let blLon = areaCoords[2].longitude;
    
    let brLat = areaCoords[3].latitude;
    let brLon = areaCoords[3].longitude;

    // Calculate relative position
    let relLat = (newLat - blLat) / (tlLat - blLat);
    let relLon = (newLon - tlLon) / (trLon - tlLon);

    // Convert to percentage
    let x = relLon * 100;
    let y = relLat * 100;

    // Ensure values are within [0, 100]
    if (y > 100) {
        y = 100;
    } else if (y < 0) {
        y = 0;
    }
    if (x > 100) {
        x = 100;
    } else if (x < 0) {
        x = 0;
    }

    return { x, y };
}
