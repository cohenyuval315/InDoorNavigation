import {  StyleSheet,TouchableOpacity, View,Modal} from "react-native";
import { useSelector } from "react-redux";
import { selectActivePath } from "../../../../../app/active/active-slice";
import { useState,useCallback,useRef } from "react";
import PathBuilderHeader from "./header";
import PathBuilderPathConfigurations from "./path-configurations";
import PathBuilderPathSelection from "./path-selection/PathBuilderPathSelection";
import PathBuilderFooter from "./footer";
import PathBuilderPathViewer from "./path-viewer/PathBuilderPathViewer";


const BuildingMapPathBuilder = (props) => {
    const activePath = useSelector(selectActivePath);
    const [isModalVisible,setIsModalVisible] = useState(true)
    const [POI, setPOI] = useState(null);

    const onNavigate = () => {
        if(activePath.length > 0){
            setIsModalVisible(false);
            props.navigation.navigate('building-pre-navigation')
        }else{
            // pop up
        }
        
    }

    const handleCloseModal = () => {
        props.navigation.goBack();
    }


    return (
        <Modal
            // activeOpacity={1}
            onPress={handleCloseModal}
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
        >
            <View style={styles.container}>
                <View style={styles.container2}> 
                    <PathBuilderHeader/>
                    <PathBuilderPathConfigurations />
                    <PathBuilderPathSelection POI={POI} setPOI={setPOI}/>
                    <PathBuilderPathViewer POI={POI} />
                    <PathBuilderFooter onClose={handleCloseModal} onNavigate={onNavigate}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center',
        height:"100%",
        backgroundColor:"transparent"
    },
    container2:{
        flexDirection:"column",
        width:"100%",
        alignItems:"center",
        backgroundColor:"lightgray",
        padding:20,
        borderRadius:30,
        flex:1,
        // pointerEvents:"box-only"
    },
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

export default BuildingMapPathBuilder;