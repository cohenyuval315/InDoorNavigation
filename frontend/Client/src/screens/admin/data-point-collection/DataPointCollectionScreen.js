
import { Alert, Animated, FlatList, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectAllBuildings } from "../../../app/building/buildings-slice";
import { Children, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { selectMap, selectMapsDims, selectMinFloor } from "../../../app/map/map-slice";
import BuildingDropDown from "../components/building-dropdown";
import TitleInput from "../components/title-input";
import AddButton from "../components/add-button";
import FloorSelection from "../components/floor-selection";
import AdminBuildingMap from "../components/building-map/AdminBuildingMap";
import AdminBuildingFloorMap from "../components/building-map/AdminBuildingFloorMap";
import { generateUUID } from "../../../utils/uuid";
import { CardinalDirection, Direction } from "../../../constants/constants";
import CategorySelection from "../components/category-selection";
import PositionSelection from "../components/position-selection";
import PositionOverlay from "../components/position-overlay";
import SaveButton from "../components/save-button";
import { calculateBottomLeftOffset } from "../../../utils/map-data";
import POIsDropDown from "../components/POIs-dropdown";
import { createTimestamp } from "../../../utils/time";
import HighTurbuanceSwitch from "../components/high-turbuance-switch";
import { useDeviceOrientationChange } from "react-native-orientation-locker";
import useWIFI from "../../../hooks/useWIFI";
import AvailableDirections from "./components/available-directions";
import PointData from "./components/point-data";
import useGPS from "../../../hooks/useGPS";
import useRotation from "../../../hooks/useRotation";

import useLinearAcceleration from "../../../hooks/useLinearAcceleration";
import useOrientation from "../../../hooks/useOrientation";
import useSensor from "../../../hooks/useSensor";
import { SensorKey } from "../../../services/sensors/SensorKey";
import useGravitySensor from "../../../hooks/useGravitySensor";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import TestSwitch from "../components/test-switch";
import UnsureSwitch from "../components/unsure-switch";
import DataModalButton from "../components/data-modal-button";
import ConfirmationModal from "../../../components/modals/confirmation";
import { openConfirm } from "../../../components/modals/confirmation/ConfirmationModal";
import DeviceOrientationSelection from "../components/device-orientation-selection";
import useMagnetometerSensor from "../../../hooks/useMagnetometerSensor";
import MapModal from "../../../components/map/modals/MapModal";
import PointOverlay from "../components/point-overlay/PointOverlay";

const directionAngles = {
    [Direction.DOWN]: 180,
    [Direction.UP]: 0,
    [Direction.LEFT]: -90,
    [Direction.RIGHT]: 90,
    [Direction.UP_LEFT]: -45,
    [Direction.UP_RIGHT]: 45,
    [Direction.DOWN_LEFT]: -135,
    [Direction.DOWN_RIGHT]: 135,
};


const DataPointCollectionScreen = () => {
    const [dataPoints, setDataPoints] = useState([]);
    const rotationRef = useRef(new Animated.Value(0));
    const mapsDims = useSelector(selectMapsDims);
    
    // const AdminBuildingMapMemoized = useMemo(() => React.memo(AdminBuildingMap), []);


    const directions = Object.values(Direction)

    const buildingCardinalDirections = {
        [Direction.DOWN]:CardinalDirection.NORTH,
        [Direction.UP]:CardinalDirection.SOUTH,
        [Direction.LEFT]: CardinalDirection.EAST,
        [Direction.RIGHT]: CardinalDirection.WEST,    
        [Direction.UP_LEFT]: CardinalDirection.SOUTH_EAST,
        [Direction.UP_RIGHT]: CardinalDirection.SOUTH_WEST,
        [Direction.DOWN_LEFT]:CardinalDirection.NORTH_EAST,
        [Direction.DOWN_RIGHT]:CardinalDirection.NORTH_WEST,
    }
    const [isHighTurbuance,setIsHighTurbuance] = useState(false);
    const [isTest,setIsTest] = useState(false);
    const [isUnsure,setIsUnsure] = useState(false);
    const [deviceOrientation,setDeviceOrientation] = useState({ roll: 0, pitch: 0, yaw: 0 });

    const {getWifiData} = useWIFI();

    const {gravityGetLastEvent} = useGravitySensor(1,0,async () => {
    },(event) => {
        console.log("event:",event.timestamp);
    },null);


    const {magnetometerGetLastEvent} = useMagnetometerSensor(1,0,async () => {
    },(event) => {
        console.log("event:",event.timestamp);
    },null);


    
    const [x,setX] = useState(null);
    const [y,setY] = useState(null);
    const [buildingID,setBuildingID] = useState(null);
    const [POIID,setPOIID] = useState(null);
    const minFloor = useSelector(selectMinFloor)
    const [floor,setFloor] = useState(null);
    const [title,setTitle] = useState(null)
    const [mapDirection,setMapDirection] = useState(Direction.UP);
    const [availableDirections,setAvailableDirections] = useState([]);
    const [points,setPoints] = useState([]);
    const [savedPoints,setSavedPoints] = useState([]);
    
    const maxWidth = SCREEN_WIDTH;

    const floorIndex = floor - minFloor;
    const currentDims = mapsDims[floorIndex]
    const ratio = SCREEN_WIDTH / currentDims.width;
    const maxHeight = ratio * currentDims.height;

    const generateTitle = () => {
        let poi = POIID ? POIID : "None";
        const currentTimestamp = createTimestamp(new Date());
        const numPoints = savedPoints.filter((p) => p.x === x && p.y === y && p.floor === floor).length
        const numPointsSaved = points.filter((p) => p.x === x && p.y === y && p.floor === floor).length
        const pointIndex = numPoints + numPointsSaved;
        let generatedTitle = `${buildingID}@${poi}@POINT@F${floor}@${x}@${y}@${mapDirection}@${currentTimestamp}@${pointIndex}`
        return generatedTitle
    }


    useEffect(()=>{
        const newTitle = generateTitle()
        setTitle(newTitle);
    },[
        mapDirection,
        buildingID,
        POIID,
        floor,
        x,
        y,
    ])



    const handleDirectionOnChange = (value) => {
        setMapDirection(value);
    }

    const handleBuildingChange = (value) => {
        setBuildingID(value);
    }

    const handleOnPOIChange = (value) => {
        setPOIID(value);
    }

    const handleTitleOnChange = (value) => {
        setTitle(value)
    }

    const handleFloorOnChange = (value) => {
        setFloor(value)
    }
    const handleOnXChange = (value) => {
        setX(value)
    }
    const handleOnYChange = (value) => {
        setY(value)
    }
    const onHighTurChange = (value)  => {
        setIsHighTurbuance(value)
    }

    const onIsTestChange = (value)  => {
        setIsTest(value)
    }

    const onIsUnsureChange = (value)  => {
        setIsUnsure(value)
    }
    const onAvailableDirectionsChange = (value) => {
        setAvailableDirections(value)
    }
    const onDeviceOrientationChange = (value) =>{
        setDeviceOrientation(value)
    }
    const getData = async () => {
        const wifiData = await getWifiData();
        const gravityData = await gravityGetLastEvent();
        const magnetometerData = await magnetometerGetLastEvent();
        const dataPoint = {
            id:generateUUID(),
            title:generateTitle(),
            timestamp:createTimestamp(new Date()),
            test:isTest,
            uncertain:isUnsure,
            floor:floor,
            x:x,
            y:y,           
            deviceOrientation:deviceOrientation, 
            direction:mapDirection,
            cardinalDirection: buildingCardinalDirections[mapDirection],
            isHighTurbuance:isHighTurbuance,
            availableDirections:availableDirections,
            availableCardinalDirections:availableDirections.map((d) => buildingCardinalDirections[d]),
            gravityData:gravityData,
            magnetometerData:magnetometerData,
            wifiData:wifiData,
            buildingID:buildingID
            
        }
        return dataPoint
    }

    const addNewDataPoint = async () => {
        const newDataPoint = await getData();
        setPoints(prev => [...prev,newDataPoint]);
    }

    const onSavePoints = () => {
        Alert.alert(
            'Confirmation',
            "are u sure to save all",
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                    setSavedPoints(prev => [...prev,...points])
                    setPoints([]);
                },
              },
            ],
            { cancelable: false }
          );
    }

    

    const onPointDelete = (index) => {
        //onConfirm()
        Alert.alert(
            'Confirmation',
            "are u sure to delete",
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                    setPoints(prev => prev.filter((_,i) => i != index));
                },
              },
            ],
            { cancelable: false }
          );
    }


    useEffect(() => {
        
        Animated.timing(rotationRef.current, {
            toValue: directionAngles[mapDirection],
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, [mapDirection]);

    const userSize = 10;

    const userPosition = useMemo(() => {
        return (
            <PositionOverlay size={userSize} floor={floorIndex} x={x} y={y} rotationRef={rotationRef}/> 
        )

    }, [userSize,floor,x,y,rotationRef.current]);   

    const pointsOverlay = useMemo(() => {
        const savedPs = savedPoints.filter((p) => p.floor === floor);
        const currentPs = points.filter((p) => p.floor === floor);
        const size = 3;
        return (                
            <>
                {savedPs.map((p) => {
                    return (
                        <PointOverlay 
                            key={`saved_${p.id}`} 
                            color={"green"}  
                            x={p.x}
                            y={p.y}
                            floor={floorIndex}
                            size={size}
                        />
                    )
                })}
                {currentPs.map((p) => {
                    return (
                        <PointOverlay 
                            key={`saved_${p.id}`} 
                            color={"blue"} 
                            x={p.x}
                            y={p.y}
                            floor={floorIndex}
                            size={size}
                        />
                    )
                })}                
            </>
           
        )

    }, [floor,savedPoints,points]);  

    return (
        <View style={{
            flex:1,

        }}>
            <ScrollView style={{
            }}>

            
            <BuildingDropDown val={buildingID} onChange={handleBuildingChange} />
            <POIsDropDown val={POIID} onChange={handleOnPOIChange}/>
            <FloorSelection initialFloor={floor} onChange={handleFloorOnChange}/>
            <TitleInput value={title} onChange={handleTitleOnChange} />
            <CategorySelection 
                categories={directions}
                label={"direction"}
                onSelect={handleDirectionOnChange}
                selectedCategory={mapDirection}
            />          
            <AvailableDirections
                onChange={onAvailableDirectionsChange}
                val={availableDirections}
            />
            <DeviceOrientationSelection val={deviceOrientation} onChange={onDeviceOrientationChange}/>
            <HighTurbuanceSwitch value={isHighTurbuance} onChange={onHighTurChange}/>
            <TestSwitch value={isTest} onChange={onIsTestChange}/>
            <UnsureSwitch value={isUnsure} onChange={onIsUnsureChange}/>
            <PositionSelection 
                onChangeX={handleOnXChange}
                onChangeY={handleOnYChange}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
                initialX={x}
                initialXBy={maxWidth/10}
                initialYBy={maxHeight/10}
                initialY={y}
            />
            <AddButton onPress={addNewDataPoint}/>
            <AdminBuildingFloorMap
                floorIndex={floorIndex}
            >
                 {userPosition}
                 {pointsOverlay}
            </AdminBuildingFloorMap>


            <View style={{
                paddingVertical:10,
            }}>

            </View>   

            </ScrollView>
            <DataModalButton dataLength={points.length} onSave={onSavePoints}>
                <FlatList
                    style={{padding:20}}
                    scrollEnabled
                    data={points}
                    renderItem={({item,index}) => {
                        return (
                            <PointData point={item} onDelete={() => onPointDelete(index)}/>
                        )
                    }}
                    keyExtractor={(item,index) => {
                        return `point_data_${item.timestamp}_${index}`;
                    }}
                />
            </DataModalButton>
            <View>
                <Text style={{color:'black'}}>
                    total save: {savedPoints.length}
                </Text>
            </View>
        </View>
    )
}
export default DataPointCollectionScreen;