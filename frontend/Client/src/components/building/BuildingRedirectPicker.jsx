
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View,Platform,StyleSheet } from "react-native"
import { isMapServiceAvailable, openMap } from "../../services/map-service-provider";
import Geolocation from '@react-native-community/geolocation';

const recheckTimeLength = 30;

const isInsideBuildingByGPS = async () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
        //   console.log('Location accuracy:', position.coords.accuracy);
          resolve(true);
        },
        (error) => {
        //   console.error('Error getting location:', error.message);
          resolve(false);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    });
  };

const BuildingRedirectPicker = ({building,onBuildingDirectionPress,onMapRedirectPress}) => {
    
    const [isGPSAvailable,setIsGPSAvailable] = useState(null);
    const [time, setTime] = useState(recheckTimeLength);
    const [isNearby,setIsNearby] = useState(false);
    const [isInsideBuildingArea,setIsInsideBuildingArea] = useState(false);
    const [isMapServiceInstalled,setIsMapServiceInstalled] = useState(null);
    const GPSText = isGPSAvailable ? 'Available' : 'UnAvailable';
    const GPSYouAreText = isGPSAvailable ? 'You Are Probably Outside' : 'You Are Probably Inside A Building';
    const platformMap = Platform.OS === 'android' ? 'Google Maps' : Platform.OS === 'ios' ? 'Apple Maps' : null;
    const openBuildingMapText = isGPSAvailable ? 
            isInsideBuildingArea ? `You Are At ${building.details.title} Outside Area!` :
            isNearby ? `You Are Nearby ${building.details.title} Building!` : `Open ${building.details.title} Map:`
            : `Are You Inside ${building.details.title} Building?`;
    const mapServiceDirectionsText = isGPSAvailable ? 'Needs Directions?' : `Are You Inside Different Building?`;
    const checkGPS = async () => {
        console.log('calling check GPS');
        const gpsAvailable = await isInsideBuildingByGPS();
        console.log('avaialble:',gpsAvailable);
        setIsGPSAvailable(gpsAvailable);
    };

    useEffect(()=>{
        checkGPS();
    },[])


    useEffect(()=>{
        isMapServiceAvailable().then((val)=>{
            setIsMapServiceInstalled(val);
        })
    },[])


    useEffect(() => {
        const interval = setInterval(() => {
          setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    

    useEffect(() => {
        if (time === 0) {
            checkGPS();
            setTime(recheckTimeLength);
        }

        let timer;
        if (time === 0) {
            timer = setTimeout(() => {
                setIsGPSAvailable(null);
            }, recheckTimeLength * 1000);
        }

        return () => clearTimeout(timer);

    }, [time]); 

    return (
        <View style={styles.container}>
            <Text style={styles.neturalText}>
                Recheck in (or reopen): {time}
            </Text>
            <Text style={styles.neturalText}>
                GPS:{' '}
                <Text style={{
                    color:'yellow'
                }}>
                    {GPSText}
                </Text>
                
            </Text>
            <Text  style={styles.neturalText}>
                Global Map Service:{' '}
                {platformMap ? (
                    <Text style={styles.availableText}>
                        {platformMap}
                    </Text>
                ):(
                    <Text style={styles.notAvailbleText}>
                        Not Available
                    </Text>
                )
                 }
            </Text>    
            <Text  style={styles.neturalText}>
                Global Map Service Installed:{' '}
                {isMapServiceInstalled !== null ? isMapServiceInstalled ? (
                    <Text style={styles.availableText}>
                        Yes
                    </Text>
                ) : (
                    <Text style={styles.notAvailbleText}>
                        No
                    </Text>                
               ) : (
                <Text style={styles.warningText}>
                    Not Availble
                </Text>
               )}

                    

            </Text>                                
            <View style={styles.bodyContainer}>
                <Text style={styles.headerText}>
                    {GPSYouAreText}
                </Text>
                <View style={styles.actionsContainer}>
                    <View style={styles.actionContainer}>
                        <Text style={[styles.neturalText,styles.actionText]}>
                            {openBuildingMapText}                            
                        </Text>
                        <TouchableOpacity style={styles.actionButton} onPress={onMapRedirectPress}>
                            <Text style={styles.actionButtonText}>
                                Click Here For {building.details.title} Map
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {platformMap !== null && isMapServiceInstalled && (
                        <View style={styles.actionContainer}>
                            <Text style={[styles.neturalText,styles.actionText]}>
                                {mapServiceDirectionsText}
                            </Text>                     
                            <TouchableOpacity style={styles.actionButton} onPress={onBuildingDirectionPress}>
                                <Text style={styles.actionButtonText}>
                                    Click Here For Directions With {platformMap} To {building.details.title} Building
                                </Text>
                            </TouchableOpacity>    
                        </View>
                    )}
                </View>

            </View>


                               
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    actionsContainer:{

    },
    headerText:{
        fontSize:30,
    },
    bodyContainer:{
        marginTop:'20%'
    },
    actionContainer:{
        marginTop:'10%'
    },
    neturalText:{
        
    },   
    actionText:{
        fontSize:15,
        padding:5,
    },
    availableText:{
        color:'lightgreen'
    },
    notAvailbleText:{
        color:'red'
    },
    warningText:{
        color:'yellow'
    },

    actionButton:{
        padding:20,
        borderColor:'lightgray',
        borderWidth:1,
        justifyContent:'center',
    },
    actionButtonText:{
        alignSelf:'center'
    },


})

const GPSAvailable = () => {
    return (
        <View>

        </View>
    )
}
const GPSNotAvailable = () => {
    return (
        <View>
            
        </View>
    )
}

export default BuildingRedirectPicker;