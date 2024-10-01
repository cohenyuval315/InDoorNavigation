import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { selectNavigationPathDistance, selectNavigationPathTimeLength } from "../../../../app/navigation/navigation-slice";


const getSecondsTimeLengthString = (seconds) => {
    if (seconds < 60) {
        return `${seconds.toFixed(0)} seconds`;
    } else if (seconds < 3600) { // Less than one hour
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        if (remainingSeconds === 0) {
            return `${minutes} minutes`;
        } else {
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds.toFixed(0)} minutes`;
        }
    } else { // One hour or more
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        if (minutes === 0 && remainingSeconds === 0) {
            return `${hours} hours`;
        } else if (remainingSeconds === 0) {
            return `${hours}:${minutes < 10 ? '0' : ''}${minutes} hours`;
        } else {
            return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} hours`;
        }
    }
};

const NavigationRouteData = ({isMock,lastMockUserPosition,onRequestMockPress,marker,onCancelPress,onContinuePress,pathDistance,pathTimeLength}) => {
    return (
        <View style={{
            backgroundColor:"#0A4A6A",
            borderTopEndRadius:20,
            borderTopStartRadius:20,
            zIndex:99999,

        }}>
            <View style={{
                justifyContent:'space-between',
                padding:10,
            }}>
                <View>
                    {isMock && (
                        <TouchableOpacity disabled={!marker} style={{
                            padding:10,
                            width:"100%",
                            backgroundColor:marker ? "lightgreen": "lightgray",
                            justifyContent:"center",
                            alignItems:"center",
                            borderRadius:30,
                            marginBottom:10,

                        }} onPress={marker && onRequestMockPress}>
                            <Text style={{
                                marginBottom:10,
                            }}>
                                Get Mock Route
                            </Text>
                        </TouchableOpacity>
                    )}
                    {isMock && !marker && (
                        <View style={{
                            width:"100%",
                            justifyContent:"center",
                            alignItems:"center",
                        }}>
                            <Text style={{
                                color:"red"
                            }}>
                                no marker is selected
                            </Text>
                        </View>
                    ) }
                </View>
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-around',
                }}>
                    <Text style={{
                        fontSize:16,
                        color:'white',
                        fontWeight:'bold',
                    }}>
                        Time Length: 
                    </Text>
                    <Text style={{
                        fontSize:16,
                        color:'white',
                        // fontWeight:'bold',
                    }}>
                        {pathTimeLength ? getSecondsTimeLengthString(pathTimeLength) : "None"}
                    </Text>
                </View>

                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-around',
                }}>
                    <Text style={{
                        fontSize:16,
                        color:'white',
                        fontWeight:'bold',
                    }}>
                        Distance:
                    </Text>     
                    <Text style={{
                        fontSize:16,
                        color:'white',
                        
                    }}>
                        {pathDistance ? `${pathDistance}m` : "None"}
                    </Text>                                   
                </View>

            </View>

            <View style={{
                flexDirection:'row',
                justifyContent:"center"
            }}>
                <TouchableOpacity style={{
                    padding:10,
                    paddingHorizontal:20,
                    backgroundColor:"lightgray",
                    borderRadius:30,
                    margin:20,
                }} onPress={onCancelPress}>
                    <Text style={{
                        color:"black",
                        textAlign:'center'
                    }}>
                        cancel
                    </Text>
                </TouchableOpacity>                     
                <TouchableOpacity disabled={isMock && !lastMockUserPosition} onPress={onContinuePress} style={{
                    padding:10,
                    paddingHorizontal:20,
                    backgroundColor:"lightgreen",
                    borderRadius:30,
                    margin:20,
                }}>
                    <Text style={{
                        color:"black",
                        textAlign:'center'
                    }}>
                        Continue
                    </Text>
                </TouchableOpacity>

            </View>            
        </View>   
    )
}

export default NavigationRouteData;