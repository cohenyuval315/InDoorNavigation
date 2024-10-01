import { Text, View,TouchableOpacity,Modal, StyleSheet, FlatList } from "react-native";
import { useDispatch,useSelector } from "react-redux";
import { selectActivePath, selectActivePathConfig } from "../../../../../../app/active/active-slice";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import EntypoIcons from 'react-native-vector-icons/Entypo'
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons'
import PathBuilderPathCheckpoint from "./path-checkpoint/PathBuilderPathCheckpoint";

const PathBuilderPathViewer = ({POI}) => {
    const activePath = useSelector(selectActivePath);
    const activePathConfig = useSelector(selectActivePathConfig);
    if (activePath.length === 0) {
        return (
            <View style={{
                justifyContent:'center',
                alignItems:'center',
                height:120,
            }}>

                <Text style={{
                    padding:10,
                    textAlign:'center',
                    fontSize:20,
                    fontWeight:"bold"

                }}>
                    No Path
                </Text>
            </View>            
        )
    }
    
    const getPath = () => {
        return [{
            title:"Current Location",
            id:"Current Location",
            pathConfig:{
                lock:true
            }
        },...activePath.map((waypoint,index) => {
            return {
                ...waypoint,
                title:`${waypoint.details.title} F-${waypoint.floor}`,
            }
        })]
    }

    const path = getPath();

    return (
        <View style={styles.container}>
            <FlatList
                scrollEnabled={true}
                
                data={path}
                renderItem={({item,index}) => {
                    return (
                        <PathBuilderPathCheckpoint POI={POI} checkpoint={item} index={index} pathLength={path.length}/>
                    )
                }}
                keyExtractor={(item,index) => `active_path_${item.id ? item.id:"current_loc_"}_${index}`}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        paddingVertical:20,
        maxHeight:190,
        minHeight:100,
        
    }
})

export default PathBuilderPathViewer;