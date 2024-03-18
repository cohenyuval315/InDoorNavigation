import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import BuildingMap from "./building-map/BuildingMap";

const BuildingMapScreen = (props) => {
    const [buildingMapData,setBuildingMapData] = useState(null);
    const [loading,setLoading] = useState(true);
    const building = props.route.params.building;
    const onPress = () => {
        
    }

    useEffect(()=>{

        return () => {

        }
    },[])

    const onBackPress =  () => {
        props.navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={onBackPress} 
                style={styles.backButton}>
                <Ionicons
                    name={"arrow-back-outline"}
                    size={30}
                    color={"black"}
                />
            </TouchableOpacity>    
            <BuildingMap 

            />        

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    backButton:{
         position: 'absolute', top: 10, left: 10,zIndex:2, 
    }
})

export default BuildingMapScreen;