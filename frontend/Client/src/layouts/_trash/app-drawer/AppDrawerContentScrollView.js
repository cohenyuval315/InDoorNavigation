import React, {} from 'react';
import {  DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View,TextInput,Button,StyleSheet,Dimensions, TouchableOpacity, Text, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({

});

const windowFontScale = Dimensions.get("window").fontScale;
const windowScale = Dimensions.get("window").scale;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const screenFontScale = Dimensions.get("screen").fontScale;
const screenScale = Dimensions.get("screen").scale;
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const AppDrawerContentScrollView = (props) => {
    const helloUserText = "Hello User!";

    const onRecentPress = () => {
        props.navigation.navigate("Recent");
    }

    const onSettingsPress = () => {

        props.navigation.navigate("Settings");
    }

    const onShutOffPress = () => {

    }
    const onDataPress = () => {
        props.navigation.navigate("Data");
    }

    const onInboxPress = () => {

    }

    const onViewProfilePress = () => {
        
    }
    const onClosePress = () => {
        props.navigation.closeDrawer();
    }
    return (
        <DrawerContentScrollView style={{
            flex:1
        }}>

            

            <View style={{
                flexDirection:"row-reverse",
            }}>
                <TouchableOpacity 
                    onPress={onClosePress}
                    style={{
                        // width:"100%",
                        padding:"5%"
                    }}>
                        <Ionicons name={"close"} size={30} color={"black"} />
                </TouchableOpacity>
            </View>


            <TouchableOpacity 
                onPress={onViewProfilePress}
                style={{
                    flex:1,
                    flexDirection:"row",
                    // backgroundColor:"red",
                    borderBottomColor:"lightgray",
                    borderBottomWidth:1,
                    margin:"5%",
                    paddingBottom:"5%",
                    justifyContent:"space-between"
                }}
            >
                <Image 
                    source={{uri:`https://via.placeholder.com/${25 * screenScale}`}}
                    style={{
                        width: 25 * screenScale,
                        height: 25 * screenScale,
                        resizeMode: 'stretch',
                    }}
                />

                <View style={{
                    flex:1,
                    // justifyContent:"center",
                    alignItems:"center"
                }}>

                    <Text style={{
                        color:"black",
                        fontWeight:"bold",
                        fontSize:20 * screenFontScale,
                    }}>
                        {helloUserText}
                    </Text>

                    <TouchableOpacity 
                    onPress={onViewProfilePress}
                    style={{
                        backgroundColor:"lightgray",
                        marginTop:"5%",
                        paddingTop:"3%",
                        paddingBottom:"3%",
                        paddingHorizontal:"10%",
                        borderRadius:20
                    }}>
                        <Text style={{
                            color:"blue",
                            fontSize:10 * windowFontScale,
                        }}>
                            View Profile
                        </Text>
                    </TouchableOpacity>                    
                </View>

            </TouchableOpacity>
            <DrawerItem label="Recent" 
                onPress={onRecentPress} 
                icon={() => <Ionicons name="time-outline" size={20} color={"gray"}/>}
            />
            <DrawerItem label="Inbox" 
                onPress={onInboxPress} 
                icon={() => <Ionicons name="mail-unread-outline" size={20} color={"gray"}/>}
            />
            <DrawerItem label="Settings" 
                onPress={onSettingsPress} 
                icon={() => <Ionicons name="settings-outline" size={20} color={"gray"}/>}
            />
            <DrawerItem label="Shut off" 
                onPress={onShutOffPress} 
                icon={() => <Ionicons name={"power-outline"} size={20} color={"gray"} />} 
            />
            <DrawerItem label="Data" 
                onPress={onDataPress} 
                icon={() => <Ionicons name={"bar-chart-outline"} size={20} color={"gray"} />} 
            />

        </DrawerContentScrollView>
    )
}

export default AppDrawerContentScrollView;