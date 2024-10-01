import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const NoInternetScreen = () => {
  return (
    <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }}>
        <Text>
            <Ionicons
                name={"globe-outline"}
                size={windowHeight/4}
                color={"white"}
            />
        </Text>
        <Text style={{
            fontSize:30,
        }}>
           No Internet Connection
        </Text>
        <View style={{
            margin:10,
        }}>
            <Text>
                Dam that kinda sad...
            </Text>
        </View>
                                      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:20,
    
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color:"black"
  },
});

export default NoInternetScreen;
