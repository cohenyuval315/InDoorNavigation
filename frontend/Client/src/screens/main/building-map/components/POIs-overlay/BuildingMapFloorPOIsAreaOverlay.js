import { Text, View } from "react-native";
import MapOverlay from "../../../../../layouts/map-overlay";
import { useSelector } from "react-redux";
import {  selectMapStatus, selectPOIsMaps } from "../../../../../app/map/map-slice";
import { SvgXml } from "react-native-svg";
import { useEffect } from "react";
import Status from "../../../../../app/status";

const BuildingMapFloorPOIsAreaOverlay = ({floorIndex}) => {
    const poisData = useSelector(selectPOIsMaps)
    // console.log("DATAINDEX:",floorIndex);
    // console.log("DATA:",poisData[floorIndex]);
    // console.log(poisData)
    const mapStatus = useSelector(selectMapStatus);
    // return null;
    useEffect(() => {
        if(mapStatus !== Status.SUCCEEDED){
            return null;
        }
    },[mapStatus])

    return (
        <MapOverlay styles={{
            pointerEvents:'none'
        }}>    
            <SvgXml
                xml={poisData[floorIndex].map}
            />
        </MapOverlay>
    )
}

export default BuildingMapFloorPOIsAreaOverlay;