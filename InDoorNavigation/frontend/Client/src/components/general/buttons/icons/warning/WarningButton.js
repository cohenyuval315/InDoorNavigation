import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import ButtonBase from '../../ButtonBase';


const WarningButton = ({color,onPress}) => {
    return (
        <ButtonBase onButtonPress={onPress} styles={{
            ...styles.warningButton,
            borderColor:color
        }}>
            
            <Icon name="warning-outline" size={35} color={color} />
        </ButtonBase>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        // position: 'absolute',
        // bottom: 16,
        // right: 16,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    warningButton: {
        padding: 5,
        borderRadius: 25,
        borderWidth:0.5,
        opacity:0.5,
        // elevation: 4, // Add shadow effect for Android
        // shadowColor: '#000', // Add shadow effect for iOS
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.5,
        // shadowRadius: 4,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 280,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4, // Add shadow effect for Android
        shadowColor: '#000', // Add shadow effect for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    modalText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default WarningButton;
