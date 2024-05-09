import { useEffect, useState } from "react";
import { TouchableOpacity, View,BackHandler, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBuilding, selectActivePath } from "../../../app/active/active-slice";
import { useNavigation } from "@react-navigation/native";

const BuildingNavigationScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selectedBuilding = useSelector(selectActiveBuilding);
    const selectedPath = useSelector(selectActivePath);

    // const buildingMapData = props.route.params.buildingMapData;
    // const mapSvgData = props.route.params.mapSvgData;
    // const initialFloorIndex = props.route.params.floorIndex;
    // const building = props.route.params.building;
    // const selectedPath = props.route.params.selectedPath;

    const [loading,setLoading] = useState(true);
    const [floorIndex,setFloorIndex] = useState(0);


    const exitNavigation = () => {

    }

    const stopNavigation = () => {

    }

    const resumeNavigation = () => {
        
    }

    const startNavigation = () => {

    }

    const startVoiceDirections = () => {

    }

    useEffect(()=>{ 
        async function centerOnUser(){
            
        }
        centerOnUser();
        startNavigation();
        startVoiceDirections()
    },[])

    const displayNextDirectionStep = () => {

    }

    const reCenter = () => {

    }

    const overView = () => {

    }

    const addAStop = () => {

    }

    const displayPOISByCategory = () => {

    }

    const Report = () => {
        
    }




    const confirmation = async () => {
        if(true){
            exitNavigation()
            navigation.goBack()
        }
    }


    useEffect(() => {
        const backAction = () => {
            
          // Return true to prevent default behavior (closing the app)
          // Return false to allow default behavior (close the app)
          // Replace the below logic with your custom behavior
          confirmation();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
    
      }, []); 
    return (
        <View style={{
            flex:1,
        }}>
            <TouchableOpacity >
                <Text style={{
                    fontSize:30,
                }}>
                    Building Navigation
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BuildingNavigationScreen;