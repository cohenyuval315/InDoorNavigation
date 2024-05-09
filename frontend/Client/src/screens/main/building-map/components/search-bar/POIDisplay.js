import { useState } from "react";
import { Dimensions, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

function stringifySchedule(schedule) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const maxDayLength = Math.max(...days.map(day => day.length));
    
    let scheduleString = '';
    days.forEach(day => {
        const open = schedule[day].open !== null ? formatTime(schedule[day].open) : 'Closed';
        const close = schedule[day].close !== null ? formatTime(schedule[day].close) : 'Closed';
        scheduleString += `${day.padEnd(maxDayLength," ")}: ${open} - ${close}\n`;
    });
    return scheduleString;
}

function formatTime(time) {
    if (time === null) return 'Closed';
    if (time === 0) return '12 am';
    if (time === 12) return '12 pm';
    if (time < 12) return `${time} am`;
    return `${time - 12} pm`;
}

function isOpen(schedule) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayIndex = new Date().getDay();
    const currentHour = new Date().getHours();
    const currentDay = days[currentDayIndex];
    const nextDay = days[(currentDayIndex + 1) % 7];

    // Check if the current day exists in the schedule
    if (!(currentDay in schedule)) {
        return ["Close", " Schedule information not available for today."];
    }

    const openingHour = schedule[currentDay].open;
    const closingHour = schedule[currentDay].close;

    // Check if openingHour and closingHour are not null
    if (openingHour === null || closingHour === null) {
        return ["Closed", " all day today."];
    } else if (currentHour >= openingHour && currentHour < closingHour) {
        return ["Open", ` until ${closingHour}:00 today.`];
    } else if (currentDay === "Saturday" && currentHour >= closingHour) {
        // Handle the special case for Saturday
        return ["Closed", ` Will reopen at ${openingHour}:00 on ${nextDay}.`];
    } else {
        // Check if it's already the next day
        if (currentHour <= closingHour) {
            return ["Closed", ` Will reopen at ${openingHour}:00 today.`];
        } else {
            // Find the opening hour for the next day
            return ["Closed", ` Will reopen at ${openingHour}:00 on ${nextDay}.`];
        }
    }
}

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

const POIDisplay = ({
    building,
    onBuildingDeSelect,
    directionsAvailable,
    onDirectionPress,
    noDirectionsMessage,
    onBuildingMapPress
}) => {
    const [isOpenHours,setIsOpenHours] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const tabs = [
        { title: 'Overview', content: 'Content for Tab 1' },
        // { title: 'Tab 2', content: 'Content for Tab 2' },
        { title: 'About', content: 'Content for Tab 3' },
      ];
    
    const toggleOpenHours = () => {
        setIsOpenHours(prev => !prev);
    }

    const onClosePress = () => {
        onBuildingDeSelect()
    }
    const buildingDetails = building.details;
    const BuildingOpenStatus = isOpen(buildingDetails.openingHours);


    const onWebsitePress = () => {
        Linking.openURL(`${buildingDetails.websiteLink}`);
    }

    const onPhoneNumberPress = () => {
        Linking.openURL(`tel:${buildingDetails.phoneNumbers}`);
    }

    const accessibilityLabels = {
        elevator: 'Elevator',
        parking: 'Parking',
        wheelchairAccessibleParking: 'Wheelchair Accessible Parking',
        wheelchairAccessibleToilet: 'Wheelchair Accessible Toilet',
        wheelchairAccessibleEntrance: 'Wheelchair Accessible Entrance'
    };

    const activityLabels = {
        toilets: 'Toilets',
        freeWifi: 'Free Wifi',
        restaurants: 'Restaurants',
        delis: 'Delis',
        convenienceStores: 'Convenience Stores',
        smokingArea: 'Smoking Area'
    };


    // accessibility:{
    //     elevator:true,
    //     parking:true,
    //     wheelchairAccessibleParking:true,
    //     wheelchairAccessibleToilet:true,
    //     wheelchairAccessibleEntrance:true
    // },
    // activities:{
    //     toilets:true,
    //     freeWifi:true,
    //     restaurants:false,
    //     delis:true,
    //     convenienceStores:false,
    //     smokingArea:true
    // }



    const availableActivities = Object.entries(buildingDetails.activities).filter(([_, available]) => available);
    const availableAccessibility = Object.entries(buildingDetails.accessibility).filter(([_, available]) => available);

    const handleOnDirectionPress= () => {
        onDirectionPress(building)
    }

    const handleOnBuildingMapPress = () => {
        onBuildingMapPress(building)
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
                                flex:1,
                            }}> 
                                <View style={{
                                    justifyContent:"center",
                                    alignItems:"center",
                                    borderColor:"lightgray",
                                    borderBottomColor:"lightgray",
                                    borderBottomWidth:1,
                                }}>
                                    <Text style={{
                                                color:"black",
                                                
                                            }}>activities</Text>
                                </View>
                                
                                <View style={{
                                    marginHorizontal:"5%",
                                }}>
                                    {availableActivities.map(([activity, _]) => (
                                        <View key={activity} style={{
                                            flexDirection:"row"
                                        }}>
                                            <Ionicons name={"checkmark-outline"} size={20} color={"black"} />
                                            <Text style={{
                                                color:"black"
                                            }}>{activityLabels[activity]}</Text>
                                            {/* Optionally, display "Available" if needed */}
                                        </View>
                                    ))}
                                </View>
                            </View>

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
                                    {availableAccessibility.map(([feature, _]) => (
                                        <View key={feature} style={{
                                            flexDirection:"row",
                                            
                                        }}>
                                            <Ionicons name={"checkmark-outline"} size={20} color={"black"} />
                                            <Text style={{
                                                color:"black"
                                            }}>{accessibilityLabels[feature]}</Text>
                                            {/* Optionally, display "Available" if needed */}
                                        </View>
                                    ))}
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

                                                
                                    {isOpenHours ? (
                                            <Text style={{
                                                marginLeft:10,
                                            }}>
                                                <Text style={{
                                                    color:BuildingOpenStatus[0] == "close" ? "red" : "lightgreen"
                                                }}>
                                                    {BuildingOpenStatus[0]}  
                                                </Text>
                                                <Text style={{
                                                    color:"black"
                                                }}>
                                                    {BuildingOpenStatus[1]}
                                                </Text>
                                            </Text>

                                        ) : (
                                            <Text style={{
                                                color:"black",
                                                fontSize:15,
                                                marginLeft:10,
                                            }}>
                                            {stringifySchedule(buildingDetails.openingHours)}
                                            </Text> 
                                        )}
                                    </TouchableOpacity>        
                                </View>

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
                                        {buildingDetails.phonenumbers}
                                    </Text>
                                </TouchableOpacity>

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
                                        {buildingDetails.websiteLink}
                                    </Text>
                                </TouchableOpacity>  

                                <View style={{
                                    flexDirection:"row",
                                    alignSelf:"baseline",
                                    marginBottom:5,
                                    marginLeft:5,
                                }}>
                                    <Ionicons name={"construct-outline"} size={20} color={"black"} />
                                    <Text style={{
                                        color:"black",
                                        marginLeft:10,
                                    }}>
                                        {new Date(buildingDetails.buildingOpeningDate).toDateString()}
                                    </Text>
                                </View>   
                            </SafeAreaView>   

                
                        </SafeAreaView>


                    </View>
                )
            }
        }
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
                            {buildingDetails.title} 
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
                                
                                {buildingDetails.city}, {buildingDetails.address}, {buildingDetails.zipCode}
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
                }}>

                    <View style={{
                        flex:1,
                    }}>
                        {!directionsAvailable && (
                            <Text style={{
                                color:"red",
                                paddingLeft:10,
                                textAlign:"left"
                            }}>
                                <Ionicons name={"alert-circle"} size={20} color={"red"} />
                                <Text>
                                    {noDirectionsMessage}
                                </Text>
                            </Text>
                        )}        

                        <View style={{
                            justifyContent:"center",
                            alignItems:"center",
                            flexDirection:"row"

                        }}>
                            <View style={{
                                flex:1,
                            }}>
                                <TouchableOpacity  disabled={!directionsAvailable} onPress={handleOnDirectionPress} style={{
                                    backgroundColor: directionsAvailable ? "lightblue" : "lightgray",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    paddingVertical:10,
                                    marginHorizontal:10,
                                    borderRadius:10,
                                    opacity: directionsAvailable ? 1: 0.5,
                                    flexDirection:"row"
                                }}>
                                    <Text style={{
                                        color:"black",
                                        textAlign:"center"
                                    }}>
                                        Directions
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flex:1,
                            }}>
                                <TouchableOpacity  onPress={handleOnBuildingMapPress} style={{
                                        backgroundColor: "lightgreen",
                                        justifyContent:"center",
                                        alignItems:"center",
                                        paddingVertical:10,
                                        marginHorizontal:10,
                                        borderRadius:10,
                                        flexDirection:"row"
                                    }}>
                                        <Text style={{
                                            color:"black",
                                            textAlign:"center"
                                        }}>
                                            Building Map
                                        </Text>
                                </TouchableOpacity>
                            </View>
                        </View>   

                        
                                 



                    </View>


                </View>

                <TabBar tabs={tabs} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />

                {renderDisplay()}

            </View>
        </View>
    )
}

export default POIDisplay;