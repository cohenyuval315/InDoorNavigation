import { useSelector } from "react-redux";
import { selectAllBuildings } from "../../../app/building/buildings-slice";
import { useState } from "react";
import { selectMap, selectMinFloor } from "../../../app/map/map-slice";

import { View } from "react-native";
import BuildingDropDown from "../components/building-dropdown";
import TitleInput from "../components/title-input";
import AddButton from "../components/add-button";
import FloorSelection from "../components/floor-selection";
import AdminBuildingMap from "../components/building-map/AdminBuildingMap";
import AdminBuildingFloorMap from "../components/building-map/AdminBuildingFloorMap";
import { generateUUID } from "../../../utils/uuid";

const POICollectionScreen = () => {
    

    const [position,setPosition] = useState(null);
    const [buildingID,setBuildingID] = useState(null);
    const minFloor = useSelector(selectMinFloor)
    const [floor,setFloor] = useState(null);
    const [title,setTitle] = useState(null)
    
    
    const [points,setPoints] = useState();
    
    const handleBuildingChange = (value) => {
        setBuildingID(value);
    }
    const handleTitleOnChange = (value) => {
        setTitle(value)
    }

    const handleFloorOnChange = (value) => {
        setFloor(value)
    }
    const getData = () => {
        const d = {
            id:generateUUID(),
            title:title,
            floor:floor,
        }
        console.log(d)
    }

    return (
        <View style={{
            flex:1,
        }}>
            <BuildingDropDown val={buildingID} onChange={handleBuildingChange} />
            <FloorSelection initialFloor={floor} onChange={handleFloorOnChange}/>
            <TitleInput value={title} onChange={handleTitleOnChange} />
            <AddButton onPress={getData}/>
            <AdminBuildingFloorMap
                floorIndex={floor - minFloor}
            >

            </AdminBuildingFloorMap>
        </View>
    )
}
export default POICollectionScreen;