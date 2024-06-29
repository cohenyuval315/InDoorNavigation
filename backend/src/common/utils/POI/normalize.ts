import { MapPOI } from "@/common/interfaces/MapPOI";


export function calculatePOIsCenterPoint(pois:MapPOI[]) {
    const poisWithCenterPoints = pois.map((poi) => {
        const mapArea = poi.mapArea;
        let totalX = 0;
        let totalY = 0;
    
        // Calculate sum of x and y coordinates
        mapArea.forEach(point => {
            totalX += point.x;
            totalY += point.y;
        });
    
        // Calculate average x and y coordinates
        const centerX = totalX / mapArea.length;
        const centerY = totalY / mapArea.length;

        return {
            ...poi,
            center:{
                x: centerX, 
                y: centerY,
                floor:poi.floor
            }
        }
    })
    return poisWithCenterPoints;
}

