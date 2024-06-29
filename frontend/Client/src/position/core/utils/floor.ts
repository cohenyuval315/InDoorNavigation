export function findClosestFloor(altitude:number, floorAltitudes:object) {
    try{
        let closestFloor = 0;
        let minDifference = Infinity;
    
        for (const [floor, floorAltitude] of Object.entries(floorAltitudes)) {
            const difference = Math.abs(floorAltitude - altitude);
            if (difference < minDifference) {
                minDifference = difference;
                closestFloor = parseInt(floor);
            }
        }
        const f = closestFloor
        return f;
    
    }catch(err){

    }

    
}