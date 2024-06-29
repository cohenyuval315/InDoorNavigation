import { BuildingMapData } from "@/common/interfaces/BuildingMapData";
import { UserSpatialInputData } from "@/common/interfaces/engine/UserSpatialInputData";
import { UserSpatialState } from "@/common/interfaces/engine/UserSpatialState";
import { MagneticMap } from "@/common/interfaces/MagneticMap";


const threshold = 0.1;

export interface MagneticMatchingResult { 

}

export class MagneticMatching {
    async getMagneticMatchingResult(
        prevState:UserSpatialState,
        data: UserSpatialInputData,
        buildingMapData:BuildingMapData,
        magneticMap:MagneticMap | any,
        
        
    ){
        const {magnetometer} = data;
        if (!magnetometer){
            return null;
        }
        const matchingPoints = [];
        for (const point of magneticMap?.points) {
            const similarity = this.calculateSimilarity(magnetometer, point.magneticProfile);
            if (similarity < threshold) {
                matchingPoints.push({
                    location: point.location,
                    similarity: similarity,
                });
            }
        }
        matchingPoints.sort((a, b) => a.similarity - b.similarity);

    }

    calculateSimilarity(profile1: any, profile2: number[]): number {
        // Implement a similarity calculation, such as Euclidean distance
        if (profile1.length !== profile2.length) {
            throw new Error("Profiles must have the same length");
        }

        let sum = 0;
        for (let i = 0; i < profile1.length; i++) {
            sum += Math.pow(profile1[i] - profile2[i], 2);
        }
        return Math.sqrt(sum);
    }
}