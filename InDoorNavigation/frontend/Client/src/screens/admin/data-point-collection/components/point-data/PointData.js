import { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PointData = ({point,onDelete}) => {
    const [open,setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(prev => !prev);
    }

    const handleOnDelete = () => {
        
        onDelete && onDelete();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.expandButton} onPress={toggleOpen}>
                    <Text style={styles.expandButtonText}>
                        {point.title}
                    </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.deleteButton} onPress={handleOnDelete}>
                    <Text style={styles.deleteButtonText}>
                        X
                    </Text>
                </TouchableOpacity>  */}
            </View>  
            <Modal visible={open} transparent>
                <View style={styles.dataContainer}>
                    <ScrollView style={styles.dataView}>
                        <Text style={styles.dataText}>
                            {JSON.stringify(point, null, 2)}
                        </Text>
                        <View style={styles.placeholder}/>
                    </ScrollView>
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={toggleOpen}>
                            <Text style={styles.closeButtonText}>
                                Close
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleOnDelete}>
                            <Text style={styles.deleteButtonText}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>                      
             
                </View>
            </Modal>    
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding:5,
    },
    buttonsContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    actionButtonsContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:'transparent',
        alignItems:'center',
        padding:20
        
    },
    deleteButton:{
        backgroundColor:"red",
        borderWidth:1,
        borderColor:'black',
        padding:10
    },
    deleteButtonText:{
        fontSize:16,
        fontWeight:'bold',
        color:'black'
    },
    expandButton:{
        zIndex:10,
    },
    expandButtonText:{
        fontSize:16,
        color:'black'
    },
    placeholder:{
        height:100,
        borderColor:'black',
        borderTopWidth:20,
        marginTop:20
    },
    dataContainer:{
        backgroundColor:'white',
        flex:1,
        height:"100%",
        width:"100%"
    },
    dataView:{
        // marginBottom:50,
        paddingBottom:20,
    },
    dataText:{
        color:'black'
    },
    closeButton:{
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:20,
        backgroundColor:'lightgray',
    },
    closeButtonText:{
        color:'black'
    },
    deleteButton:{
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:20,
        backgroundColor:'red'
    },
    deleteButtonText:{
        color:'black',
        
    }    
})

export default PointData;