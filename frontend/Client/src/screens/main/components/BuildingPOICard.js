import { useState } from "react";
import { Dimensions, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchBuildingByMapId } from "../../../app/map/map-slice";
import { setDestinationToActivePath, setActivePOI } from "../../../app/active/active-slice";

const TabBar = ({ tabs, selectedIndex, onSelect }) => {
    return (
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabItem, index === selectedIndex && styles.selectedTab]}
            onPress={() => onSelect(index)}>
            <Text style={styles.tabText}>{tab.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  




const BuildingPOICard = ({POI,onClose}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [isOpenHours,setIsOpenHours] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const tabs = [
        { title: 'Overview', content: 'Content for Tab 1' },
        { title: 'About', content: 'Content for Tab 3' },
      ];


    const toggleOpenHours = () => {
        setIsOpenHours(prev => !prev);
    }

    const onClosePress = () => {
        dispatch(setActivePOI(null))
        onClose && onClose()
    }
    const POIDetails = POI.details;
    const POIOpenStatus = POI.openStatus


    const onWebsitePress = () => {
        if(POIDetails.websiteLink){
            Linking.openURL(`${POIDetails.websiteLink}`);
        }
    }

    const onPhoneNumberPress = () => {
        if(POIDetails.phoneNumbers){
            Linking.openURL(`tel:${POIDetails.phoneNumbers}`);
        }
        
    }

    const renderDisplay = () => {
        switch(selectedIndex){
            case 1:{ //
                return (
                    <View style={{
                        flex:1,
                        
                        
                    }}>
                        <View style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                            flex:1,
                        }}>


                            <View style={{
                                marginVertical:5,
                                width:1,
                                backgroundColor:"lightgray"
                            }}>
                            </View>

                            <View style={{
                                flex:1,
                            }}>
                                <View style={{
                                    justifyContent:"center",
                                    alignItems:"center",
                                    borderBottomColor:"lightgray",
                                    borderBottomWidth:1,
                                }}>
                                    <Text style={{
                                                color:"black"
                                            }}>accessibility</Text>
                                </View>
                                <View style={{
                                    marginHorizontal:"5%",
                                    flex:1,
                                    flexWrap:"wrap"
                                }}>

                                </View>
                            </View>

                        </View>
                    </View>
                )
            }
            default:{ // Overview
                return (   
                    <View style={{
                        padding:10,
                    }}>
                        <SafeAreaView style={{
                            flexDirection:"row",
                            height:Dimensions.get("window").height/5,
                            overflow:"hidden"
                            
                        }}>
                            <View>
                                <Image
                                    source={{uri:"https://via.placeholder.com/75"}}
                                    height={125}
                                    width={125}
                                    style={{
                                        backgroundColor:"black",
                                        marginBottom:5,
                                    }}
                                />
                            </View>

                            <SafeAreaView style={{
                     

                            }}>
                                <View style={{
                                    marginBottom:5,
                                }}>
   
                                    {POIOpenStatus && (
                                        <>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection:"row",
                                                    alignSelf:"baseline",
                                                    marginLeft:5,
                                                }}
                                                onPress={toggleOpenHours}>
                                                <Text style={{
                                                        
                                                    }}>
                                                    <Ionicons name={"time-outline"} size={20} color={"black"} />
                                                </Text>   
                                            </TouchableOpacity> 

                                            {isOpenHours ? (
                                                <Text style={{
                                                    marginLeft:10,
                                                }}>
                                                    <Text style={{
                                                        color:POIOpenStatus[0] == "close" ? "red" : "lightgreen"
                                                    }}>
                                                        {POIOpenStatus[0]}  
                                                    </Text>
                                                    <Text style={{
                                                        color:"black"
                                                    }}>
                                                        {POIOpenStatus[1]}
                                                    </Text>
                                                </Text>

                                            ) : (
                                                <Text style={{
                                                    color:"black",
                                                    fontSize:15,
                                                    marginLeft:10,
                                                }}>
                                                    {POIDetails.scheduleString}
                                                </Text> 
                                            )}
                                        </>
                                    )}        
 
                                       
                                </View>
                                
                                {POIDetails.phoneNumbers && (
                                    <TouchableOpacity  onPress={onPhoneNumberPress} style={{
                                        flexDirection:"row",
                                        alignSelf:"baseline",
                                        marginBottom:5,
                                        marginLeft:5,
                                
                                    }}>
                                        
                                        <Ionicons name={"call-outline"} size={20} color={"black"} />
                                        <Text style={{
                                            color:"black",
                                            marginLeft:10,
                                        }}>
                                            {POIDetails.phonenumbers}
                                        </Text>
                                    </TouchableOpacity>
                                )}
  
                            {POIDetails.websiteLink && (
                                <TouchableOpacity
                                onPress={onWebsitePress}
                                style={{
                                    flexDirection:"row",
                                    alignSelf:"baseline",
                                    marginBottom:5,
                                    marginLeft:5,
                                }}>
                                    <Ionicons name={"link-outline"} size={20} color={"black"} />
                                    <Text style={{
                                        color:"black",
                                        marginLeft:10,
                                
                                    }}>
                                        {POIDetails.websiteLink}
                                    </Text>
                                </TouchableOpacity>  
                            )}

                            </SafeAreaView>   

                        </SafeAreaView>

                    </View>
                )
            }
        }
    }

    const onSetAsDestinationPress = () => {
        setDestinationToActivePath(POI)
    }

    const onNavigatePress = () => {
        setDestinationToActivePath(POI)
        navigation.navigate('building-pre-navigation')
    }

    return (
        <View style={{

            alignItems:"stretch",
            flex:1,
            justifyContent:"space-between",
        }}>
            <View style={{
                flex:1,
            }}>

                <View style={{
                    flexDirection:"row",
                }}>
                    <View style={{
                        justifyContent:"center",
                        paddingHorizontal:20,
                        flex:1,
                    }}>
                        <Text style={{
                            color:"black",
                            fontWeight:"bold",
                            fontSize:25,
                            
                        }}>
                            {POIDetails.title} 
                        </Text>
                        <View style={{
                            flexDirection:"row"
                        }}>
                            <Ionicons name={"location"} size={20} color={"black"} />
                            <Text style={{
                                flex:1,
                                color:"black",
                                fontSize:16,
                                justifyContent:"center"
                            }}>
                                
                                F{POI.floor}
                            </Text>                         
                        </View>
               
                    </View>

                    <TouchableOpacity 
                        onPress={onClosePress}
                        style={{
                            paddingRight:"5%"
                        }}>
                            <Text style={{
                            }}>
                                <Ionicons name={"close"} size={40} color={"black"} />
                            </Text>
                    </TouchableOpacity>                
                </View>

                <View style={{
                    flex:1,
                    flexDirection:'row',
                    justifyContent:'space-around'
                }}>
                    <TouchableOpacity style={{
                        flex:1,
                        backgroundColor:'red',
                        borderRadius:30,
                        padding:10,
                        margin:10
                    }} onPress={onSetAsDestinationPress}>
                        <Text style={{
                            color:'black',
                            textAlign:'center'
                        }}>
                            Set As Destination
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex:1,
                        backgroundColor:'pink',
                        borderRadius:30,
                        padding:10,
                        margin:10
                    }} onPress={onNavigatePress}>
                        <Text style={{
                            color:'black',
                            textAlign:'center'
                        }}>
                            Navigate
                        </Text>
                    </TouchableOpacity>                        

                </View>



                <TabBar tabs={tabs} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />

                {renderDisplay()}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingBottom: 5,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
    },
    selectedTab: {
    //   backgroundColor: '#ccc',
      borderBottomColor:"blue",
      borderBottomWidth:1,
    },
    tabText: {
    color:"black",
      fontSize: 16,
    },

  
  });

export default BuildingPOICard;