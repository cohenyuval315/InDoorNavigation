import { Text, View } from "react-native";
import MapOverlay from "../../../../../layouts/map-overlay";
import { useSelector } from "react-redux";
import {  selectMapStatus, selectPOIsMaps } from "../../../../../app/map/map-slice";
import { SvgXml } from "react-native-svg";
import { useEffect } from "react";
import Status from "../../../../../app/status";

const BuildingMapFloorPOIsAreaOverlay = ({floorIndex}) => {
    const poisData = useSelector(selectPOIsMaps)
    const mapStatus = useSelector(selectMapStatus);

    useEffect(() => {
        if(mapStatus !== Status.SUCCEEDED){
            return null;
        }
    },[mapStatus])

    return (
        <MapOverlay>    
            <SvgXml
                xml={poisData[floorIndex].pois}
            />
        </MapOverlay>
    )
}

export default BuildingMapFloorPOIsAreaOverlay;