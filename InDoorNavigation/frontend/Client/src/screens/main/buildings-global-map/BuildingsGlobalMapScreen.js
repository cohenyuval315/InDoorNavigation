import { Text, View,StyleSheet,Linking,Platform, Dimensions,TouchableOpacity, TextInput, Alert, Button  } from "react-native";
import { memo, useEffect, useRef, useState } from "react";
import BuildingsGlobalMap from "./BuildingsGlobalMap";
import { LoadingScreen } from "../../general";
import LoadingModal from "../../../components/general/modals/loading";
import BuildingsGlobalMapBottomDrawer from "../components/buildings-search-bar-bottom-drawer/BuildingsGlobalMapBottomDrawer";



const BuildingsGlobalMapScreen = memo((props) => {
    const [mapComponent, setMapComponent] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMapComponent(
                <BuildingsGlobalMap/> 
            );
        });
    
        return () => clearTimeout(timer);
    }, []);
    

    return (
        <View style={styles.container}>
            {loading ? (<LoadingScreen />) : (
                    <>
                        <BuildingsGlobalMapBottomDrawer />
                        {mapComponent || (
                            <LoadingModal visible={true} />
                        )}
                    </>
                )
            }
        </View>
    )
})

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:"100%",
        width:"100%"
    },
})


export default BuildingsGlobalMapScreen;