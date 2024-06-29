import { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View,BackHandler, Text,AppState,Alert, Animated, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBuilding, selectActivePath } from "../../../app/active/active-slice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import WebsocketClient from "../../../server/ws-client";
import BuildingMap from "../components/BuildingMap";
import BuildingMapUserPositionOverlay from "./components/user-position-overlay/BuildingMapUserPositionOverlay";
import NavigationPathSVG from "./components/navigation-path-svg/NavigationPathSVG";
import { selectMinFloor, selectNumberOfFloors } from "../../../app/map/map-slice";
import LiveDirectionsView from "./components/live-directions-view";
import { WifiService } from "../../../services/WifiService";
import { Geolocation, GeolocationService } from "../../../services/GpsService";
import { SensorKey } from "../../../sensors/SensorKey";
import SensorsService from "../../../services/SensorsService";
import { resetPaths, selectNavigationError, selectNavigationPathsSVGs, selectNavigationStatus, setDestinationPOI } from "../../../app/navigation/navigation-slice";
import Status from "../../../app/status";
import StopButton from "./components/stop-button";
import { UserIndoorPositionService } from "../../../services/UserIndoorPositionService";
import VolumeControlButton from "./components/volume-control-button";
import Tts from 'react-native-tts';

const BottomBar = ({timeLeft = 0,distanceLeft = 0}) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000); // Update time every second
    
        return () => clearInterval(timer); // Clean up the timer on component unmount
      }, []);

      const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };

    return (
        <View style={{
            position:"absolute",
            bottom:0,
            width:"100%",
            justifyContent:"center"
        }}>
            <View style={{
                justifyContent:"center",
                alignItems:"center",
                flex:1,
            }}>

                <View style={{
                    flex:1,
                    width:'40%',
                    justifyContent:"center",
                    alignItems:"center",
                    paddingHorizontal:10,
                    borderRadius:10,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                }}>
                    <View>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                        }}>{formatTime(currentTime)}</Text>
                    </View>

                
                    <View style={{
                        flexDirection:"row",
                        justifyContent:"space-between",
                        width:"100%",
                    }}>
                        <Text>
                            {timeLeft} min
                        </Text>

                        <Text>
                            {distanceLeft} meters
                        </Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

const ButtonLeft = () => {

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    buttonText: {
        color: 'red',
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 5,
    },
    infoText: {
        marginHorizontal: 20,
    },
});



const BuildingNavigationScreen = (props) => {
    const [client, setClient] = useState(null);
    const [floorIndex,setFloorIndex] = useState(0);
    const initialNavigationPath = useSelector(selectNavigationPathsSVGs);
    const navigationError = useSelector(selectNavigationError);
    const navigationStatus = useSelector(selectNavigationStatus);
    const [routeSVG, setRouteSVG] = useState(null)
    const [isWSLoading, setIsWSLoading] = useState(true);
    const [isWSConnected, setIsWSConnected] = useState(false);
    const numFloors = useSelector(selectNumberOfFloors);
    const minFloor = useSelector(selectMinFloor);

    const containerRef = useRef(null);
    const rotationRef = useRef(new Animated.Value(0)); 

    const initialOpacitiesValues = Array.from({ length: numFloors }, (_, index) => index + minFloor == 0 ? new Animated.Value(1) : new Animated.Value(0))
    const opacitiesRef = useRef(initialOpacitiesValues);

    const [retryAttempts, setRetryAttempts] = useState(0);

    const [appState, setAppState] = useState(AppState.currentState);
    const [wasInBackground, setWasInBackground] = useState(false);
    const [keepRunning, setKeepRunning] = useState(false);
    const webSocket = useRef(null);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selectedBuilding = useSelector(selectActiveBuilding);
    const selectedPath = useSelector(selectActivePath);

    const [loading,setLoading] = useState(true);

    const [loadingPath,setLoadingPath] = useState(true);
    const [isTts,setIsTts] = useState(null);
    const [loadingTts,setLoadingTts] = useState(true);
    const [currentTtsDirection,setCurrentTtsDirection] = useState('');
    const [volume, setVolume] = useState(0.5);
    const onVolumeChange = (newVolume) => {
        setVolume(newVolume);
    }

    const speakDirection = (volume) => {
        Tts.speak(currentTtsDirection,{
            androidParams: {
                KEY_PARAM_PAN: -1,
                KEY_PARAM_VOLUME: volume,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
              },
        })
    }

    useEffect(() => {
        Tts.getInitStatus().then(() => {
            setIsTts(true);
            Tts.setDefaultLanguage('en-IE');
            Tts.setDefaultRate(0.6);
            Tts.setDefaultPitch(1.5);            
            setLoadingTts(false);
  
        }, (err) => {
          if (err.code === 'no_engine') {
            setIsTts(false)
            setLoadingTts(false);
            Tts.requestInstallEngine();
          }
        });
        return () => {
            if(isTts){
                Tts.stop();
            }            
        }
    },[])

    useEffect(() => {
        switch(navigationStatus){
            case Status.IDLE : {
                break;
            }
            case Status.FAILED: {
                setLoadingPath(false);
                console.log(navigationError)
                break;
            }
            case Status.SUCCEEDED: {
                setLoadingPath(false);
                setRouteSVG(initialNavigationPath)
                break;
                
            }
            case Status.PENDING: {
                setLoadingPath(true);
                break;
            }
        }

    },[navigationStatus])

    

 

    const onSensorNext = (data,sensorKey) => {

    }
    const onSensorError = (err,sensorKey) => {
        
    }
    const onSensorComplete = (sensorKey) => {
        
    }



    const onBackgroundNavigationExit = () => {
        setWasInBackground(false);
        // BackHandler.exitApp()
        console.log('exiting...')
    }

    const onBackgroundNavigationContinue = () => {

    }

    const onBackgroundNavigationStay = () => {

    }

    const onForegroundNavigationContinue = () => {
        Alert.alert('App State', 'The app was running in the background and has now come to the foreground, switching to normal running.');
        setWasInBackground(false);
    }

    
    const confirmationExit = async () => {
        Alert.alert(
            'Confirmation',
            'Do you want to keep the app running in the background, stay, or exit?',
            [
                {
                    text: 'Run In Background',
                    onPress: () => onBackgroundNavigationContinue(),
                    style: 'cancel'
                },
                {
                    text: 'Stay',
                    onPress: () => onBackgroundNavigationStay(),
                    style: 'default'
                },
                {
                    text: 'Stop And Exit',
                    onPress: () => onBackgroundNavigationExit()
                }
            ],
            { cancelable: false }
        );      
    }

    const confirmationStop = async () => {
        Alert.alert(
            'Confirmation',
            'Stop Navigation? ',
            [
                {
                    text: 'Continue',
                    onPress: () =>  {},
                    style: 'cancel'
                },
                { text: 'Stop', onPress: onStopPress }
            ],
            { cancelable: false }
        );        
    }


    useEffect(() => {
        const backAction = () => {
          confirmationStop();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
    
      }, []); 

    //   useEffect(() => {
    //     const handleAppStateChange = (nextAppState) => {
    //         if (
    //             appState.match(/inactive|background/) &&
    //             nextAppState === 'active'
    //         ) {
    //             if (wasInBackground && keepRunning) {
    //                 onForegroundNavigationContinue()
    //             }
    //         } else if (nextAppState === 'background') {
    //             confirmationExit();
    //         }
    //         setAppState(nextAppState);
    //     };

    //     AppState.addEventListener('change', handleAppStateChange);
    //   },[appState])


    //   useFocusEffect(
    //     useCallback(() => {
    //       const onBeforeRemove = (e) => {
    //         e.preventDefault();
    
    //         Alert.alert(
    //           'Exit Confirmation',
    //           'Are you sure you want to exit the app?',
    //           [
    //             { text: 'Cancel', style: 'cancel', onPress: () => {} },
    //             {
    //               text: 'OK',
    //               onPress: () => navigation.dispatch(e.data.action),
    //             },
    //           ]
    //         );
    //       };
    
    //       navigation.addListener('beforeRemove', onBeforeRemove);
    
    //       return () => {
    //         navigation.removeListener('beforeRemove', onBeforeRemove);
    //       };
    //     }, [navigation])
    //   );

      const onWebSocketNext = (value) => {

      }

      const onWebSocketError = (value) => {

      }

      const onWebSocketComplete = () => {

      }
      useEffect(() => {
        const websocketClient = new WebsocketClient();
            setClient(websocketClient);
          
            websocketClient.connect(() => {
                console.log('WebSocket connection opened');
                onWebsocketConnection();
                setIsWSLoading(false);
                setIsWSConnected(true);
                
            }, () => {
                console.log('WebSocket connection closed');
                setIsWSLoading(false);
                setIsWSConnected(false);  
            })

            const subscription = websocketClient.subscribe({
                 complete:onWebSocketComplete,
                 error:onWebSocketError,
                 next:onWebSocketNext,
                 
            })

            return () => {
                subscription.unsubscribe();
                websocketClient.disconnect();
            };
        }, []);

        const onWebsocketConnection = () => {
 
        };

        const disconnectWebSocket = () => {
            if (client) {
                client.disconnect();
            }
        };



        

    const onPanMove = () => {

    }


    const onStopPress = () => {
        props.navigation.navigate("building-map");
        onLeave();
    }

    const onCancelPress = () => {
        onLeave();
    }

    const onLeave = () => {
        dispatch(setDestinationPOI(null));
        dispatch(resetPaths());
        disconnectWebSocket();
    }

    const userBuildingMapCoordinates = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    return (
        <View style={{
            flex:1,
        }}>
            <LiveDirectionsView />
            <StopButton onPress={confirmationStop}/>
            <BuildingMap 
                centerOn={null}
                containerRef={containerRef}
                currentFloorIndex={floorIndex}
                opacitiesRef={opacitiesRef}
                onPanMove={onPanMove}
                onPOIPress={null}
                rotationRef={rotationRef}

                imageProps={{

                }}
            >
                <BuildingMapUserPositionOverlay userBuildingMapCoordinates={userBuildingMapCoordinates}/>
                {!loadingPath && (<NavigationPathSVG pathSVG={routeSVG[floorIndex]}/>)}
            </BuildingMap>
            <BottomBar/> 
            <VolumeControlButton volume={volume} onVolumeChange={onVolumeChange}/>
        </View>
    )
}

export default BuildingNavigationScreen;