import { useState } from "react"
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const DataModalButton = ({dataLength,onSave,children}) => {
    const [isVisible,setIsVisible] = useState(false);

    return (
        <TouchableOpacity style={styles.container} onPress={() => setIsVisible(true)}>
            <Text style={styles.buttonText}>
                {dataLength}
            </Text>
            <Modal visible={isVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {children}
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Button title="Close" onPress={() => setIsVisible(false)}/>
                        <View style={{
                            height:20,
                        }}/>
                        <Button title="Save" onPress={() => {
                            setIsVisible(false);
                            onSave();
                        }} />
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        position:"absolute",
        bottom:0,
        right:0,
        padding:20,
        backgroundColor:'lightgreen',
        borderRadius:10,
        zIndex:300,
    },
    modalContainer:{
        flex:1,
    },
    modalContent:{
        flex:1,
    },
    buttonText:{
        color:'black'
    },
    buttonsContainer:{
        flexDirection:'column-reverse',
        justifyContent:'flex-end',
        padding:20,
    }
})

export default DataModalButton