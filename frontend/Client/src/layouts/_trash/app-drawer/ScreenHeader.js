import React, {} from 'react';
import { View, TouchableOpacity,StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ScreenHeader = ({title},props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.headerContent}>{props.children}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        paddingTop: "2%",
        paddingBottom: "3%", 
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: 30,
    },
    headerContent: {
        flexDirection: 'row', // Adjust this based on your layout requirements
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ScreenHeader;