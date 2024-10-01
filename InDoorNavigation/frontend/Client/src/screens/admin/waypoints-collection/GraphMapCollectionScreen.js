// import { Text, TextInput, TouchableOpacity, View } from "react-native";
// import AdminBuildingMap from "../components/building-map/AdminBuildingMap";
// import { useSelector } from "react-redux";
// import { selectNumberOfFloors } from "../../../app/map/map-slice";
// import { useState } from "react";
// import CategorySelection from "../../../components/general/category-selection";


const waypointCategories = ["Point","Edge"]
const GraphMapCollectionScreen = () => {
    return null;
    const maps = useSelector(selectMap);
    const Buildings = useSelector(selectAllBuildings);
    const buildingsDropdownItems = Buildings.map((item) => {
        return {
            label:item.details.title,
            value:item.id
        }
    })
    const [selectedBuilding,setSelectedBuilding] = useState(buildingsDropdownItems[0]);    
    const [floorsOpacities, setFloorOpacities] = useState([1,0]);
    const [selectedWaypointType,setSelectedWaypointType] = useState(null);
    const onWaypointTypeChange = (value) => {
        setSelectedWaypointType(value);
    }
    const [points,setPoints] = useState([]);
    const [edges,setEdges] = useState([]);

    /** BOTH */
    const [title,setTitle] = useState("");

    /** POINT */
    const [POI,setPOI] =  useState(null);
    const [floor,setFloor] = useState(0);
    const [waypointType,setWaypointType] = useState()
    const [position,setPosition] = useState({
        x:0,
        y:0,
    });    
    const [availableDirections,setAvailableDirections] = useState();

    /** EDGE */
    const [edgeType,setEdgeType] = useState()
    const [weight,setWeight] = useState({});
    const [pointA,setPointA] = useState()
    const [pointB,setPointB] = useState()

    return (
        <View style={{
            flex:1,
        }}>
            <TextInput value="12"/>
            <CategorySelection 
                label={"waypoint"}
                categories={waypointCategories} 
                selectedCategory={selectedWaypointType} 
                onSelect={onWaypointTypeChange}
            />
            {/* <AdminBuildingMap 
                floorsOpacities={floorsOpacities}
            >

            </AdminBuildingMap> */}

            <View>
                <TouchableOpacity>
                    <Text>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GraphMapCollectionScreen;