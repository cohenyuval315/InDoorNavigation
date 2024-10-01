import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons'

const ErrorMessageModal = ({ route, navigation }) => {
    const [isModalVisible,setIsModalVisible] = useState(true);
    const { error } = route.params;
    const handleCloseModal = () => {
        navigation.goBack();
        navigation.goBack();
        setIsModalVisible(false);
    }
    return (
        <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="fade"
        >
            <TouchableOpacity style={styles.modalContainer} onPress={handleCloseModal}>
                <View style={styles.shadowContainer}>
                    <View style={styles.container} elevation={5}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerIcon}>
                                <MaterialIconsIcons name="error" color={"white"} size={24}/>
                            </Text>
                            <Text style={styles.headerText}>                
                                Error
                            </Text>
                        </View>                
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                {error}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} >
                                <Text style={styles.buttonText}>
                                    close
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer:{
        width:"100%",
        height:"100%"
    },
    shadowContainer:{
        position:"absolute",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        bottom:"35%"
    },
    container:{
        width:"100%",
        pointerEvents:"box-only",
        padding:10,
    },
    headerContainer:{
        width:"100%",
        backgroundColor:"red",
        flexDirection:"row",
        padding:20,
        borderTopStartRadius:10,
        borderTopEndRadius:10,
    },
    headerIcon:{
        fontSize:22,
    },   
    headerText:{
        fontSize:22,
        color:"white"
    },    
    textContainer:{
        backgroundColor:"white",
        width:"100%",
        minHeight:100,
        maxHeight:150,
    },
    text:{
        color:"black",
        padding:30,
        fontSize:16,
    },
    buttonContainer:{
        backgroundColor:"#FBFBFB",
        width:"100%",
        padding:20,
        borderWidth:0.5,
        borderColor:"lightgray",
        flexDirection:"row-reverse",
        borderBottomStartRadius:10,
        borderBottomEndRadius:10,
    },
    button:{
        paddingVertical:10,
        paddingHorizontal:30,
        backgroundColor:"lightgray",
        borderRadius:20,
    },
    buttonText:{
        fontSize:16,
        color:"black"
    }
})

export default ErrorMessageModal;