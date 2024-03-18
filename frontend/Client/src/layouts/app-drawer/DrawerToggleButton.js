import React, {} from 'react';
import { View,Dimensions, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DrawerToggleButton = (props) => {
    const insets = useSafeAreaInsets();
    const onButtonPress = () => {
        props.navigation.openDrawer();
    }
    return (
        <SafeAreaView style={{
            position:"absolute",
            zIndex:1,
            top: 10 * Dimensions.get("window").scale,
            left: 5 * Dimensions.get("window").scale
        }}>
            <TouchableOpacity 
                onPress={onButtonPress}
                style={{
                    backgroundColor:"white",
                    borderRadius:5,
                    padding:5,
                    alignSelf:"baseline",
                    borderRadius: 8,
                    elevation: 3, // For Android shadow
                    shadowColor: '#000', // For iOS shadow
                    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
                    shadowOpacity: 0.25, // For iOS shadow
                    shadowRadius: 3.84, // For iOS shadow
                }}>
                    <Ionicons name={"reorder-three-outline"} size={40} color={"black"} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default DrawerToggleButton;