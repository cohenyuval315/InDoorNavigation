import { useEffect, useLayoutEffect, useState } from "react";
import { BackHandler, StyleSheet,View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuildingByMapId, selectMapError, selectMapStatus } from "../../../app/map/map-slice";
import Status from "../../../app/status";
import { LoadingScreen } from "../../general";
import LoadingModal from "../../../components/general/modals/loading";
import BuildingMapDisplayMap from "./BuildingMapDisplayMap";
import { useConfirmationModal } from "../../../contexts/ConfirmationModalContext";
import { selectActiveBuilding } from "../../../app/active/active-slice";
import useLoadingMessages from "../../../hooks/useLoadingMessages";
import BuildingPOIsMapBottomDrawer from "../components/poi-search-bar-bottom-drawer/BuildingPOIsMapBottomDrawer";


const BuildingMapDisplayScreen = (props) => {
    const dispatch = useDispatch();
    const mapStatus = useSelector(selectMapStatus);
    const mapError = useSelector(selectMapError);
    const [loading,setLoading] = useState(true);
    const [mapComponent, setMapComponent] = useState(null);
    const {openConfirm} = useConfirmationModal();
    const selectedBuilding = useSelector(selectActiveBuilding);
    const {resetLoadingMessage} = useLoadingMessages();
  

    useLayoutEffect(() => {
        resetLoadingMessage();
        dispatch(fetchBuildingByMapId(selectedBuilding.id));
    },[])

    const backAction = () => {
        openConfirm(
            "Return to Building Selection",
            "Are you sure you want to return to the building selection screen?",
            () => {
                props.navigation.navigate("buildings-global-map")
            },
        );
        return true;
    };
    

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
      
        return () => backHandler.remove();
    }, [])



    useEffect(() => {
        switch(mapStatus){
            case Status.SUCCEEDED:{
                setLoading(false);
                break;
            }
            case Status.FAILED:{
                setLoading(false);
                break;
            }
        }
    }, [mapStatus])

    useEffect(() => {
        const timer = setTimeout(() => {
            setMapComponent(
                <BuildingMapDisplayMap/> 
            );
        });
    
        return () => clearTimeout(timer);
    }, [props]);


    return (
        <View style={styles.container}>
            {loading ? (<LoadingScreen />) : (
                    <>
                        <BuildingPOIsMapBottomDrawer />
                        {mapComponent || (
                            <LoadingModal visible={true} />
                        )}
                    </>
                )
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:"100%",
        width:"100%"
    },
    backButton:{
        backgroundColor:"white",
        borderRadius:5,
        position: 'absolute', 
        top: 27, 
        left: 10,
        padding:5,
        zIndex:2, 
    }
})

export default BuildingMapDisplayScreen;