import { Text, View } from "react-native";
import MapOverlay from "../../../../layouts/map-overlay";
import { useSelector } from "react-redux";
import { selectMapData } from "../../../../app/map/map-slice";
import { SvgXml } from "react-native-svg";
import { selectGraphMaps, selectGraphStatus } from "../../../../app/admin/admin-slice";
import Status from "../../../../app/status";
import { useEffect } from "react";

const BuildingMapGraphDataOverlay = ({floorIndex}) => {
    const graphData = useSelector(selectGraphMaps);
    const graphStatus = useSelector(selectGraphStatus);
    
    useEffect(() => {
        if(graphStatus !== Status.SUCCEEDED){
            return null;
        }
    },[graphStatus])

    return (
        <MapOverlay>    
            <SvgXml
                xml={graphData[floorIndex].graph}
            />
        </MapOverlay>
    )
}

export default BuildingMapGraphDataOverlay;