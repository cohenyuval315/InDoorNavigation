import { StyleSheet, Text, View } from "react-native"
import PathBuilderPathCheckpointButtons from "./PathBuilderPathCheckpointButtons"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo'
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from "react-redux";
import { selectActivePath } from "../../../../../../../app/active/active-slice";
const PathBuilderPathCheckpoint = ({POI,checkpoint,index,pathLength}) => {
    const iconSize = 20;
    console.log(checkpoint)
    const isDest = index == pathLength - 1;
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                    <View style={styles.textContainer}>
                        <Text>
                            {isDest ? (
                                <MaterialIconsIcons 
                                    name="location-on" 
                                    color={"red"} 
                                    size={iconSize} />
                            ) : (
                                <MaterialCommunityIcons 
                                    name={index === 0 ? "record-circle": "circle"} 
                                    color={"black"} 
                                    size={iconSize} 
                                />
                            )}
                        </Text>                                                
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.checkpointText}>
                            {checkpoint.title}
                        </Text>   
                    </View>

                    <PathBuilderPathCheckpointButtons isDest={isDest} POI={POI} checkpoint={checkpoint} index={index}/>
                      
            </View>

            {!isDest && (
                <Text>
                    <EntypoIcons name="dots-three-vertical" color={"black"} size={iconSize} />
                </Text>
            )}                      
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        
    },
    rowContainer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        justifyContent:"space-between"
    },
    textContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
    },
    checkpointText:{
        flex: 1,
        paddingLeft:20,
        fontSize:16,
        overflow:"hidden",
        color:"black"
    }
})


export default PathBuilderPathCheckpoint