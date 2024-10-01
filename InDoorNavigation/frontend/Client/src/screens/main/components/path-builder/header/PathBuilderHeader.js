import { View,StyleSheet, Text } from "react-native";
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons'

const PathBuilderHeader = () => {
    const iconSize = 20;
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerTextContainer}>
                <View style={{
                    marginRight:10,
                }}>
                    <Text>
                        <MaterialIconsIcons name="add-location-alt" color={ "black"} size={iconSize * 2} />
                    </Text>                            
                </View>
                <View style={{
                    flex:1,
                    marginRight:10
                }}>
                    <Text style={styles.headerText}>
                        Picking A POI and Click The Icon To Add the Stop Under
                    </Text>                            
                </View>
            </View>
        </View> 
    )
}


const styles = StyleSheet.create({
    headerContainer:{
        width:"100%",
        borderColor:"black",
        borderWidth:1,
    },
    headerTextContainer:{
        width:"100%",
        flexDirection:"row",
        padding:20,
    },
    headerText:{
        width:"100%",
        flex:1,
        flexWrap:"wrap"
    }
})
export default PathBuilderHeader;