import { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View,BackHandler, Text,AppState,Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBuilding, selectActivePath } from "../../../app/active/active-slice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import WebsocketClient from "../../../services/server/ws-client";

const BuildingNavigationScreen = (props) => {
    const [appState, setAppState] = useState(AppState.currentState);
    const [wasInBackground, setWasInBackground] = useState(false);
    const [keepRunning, setKeepRunning] = useState(false);
    const webSocket = useRef(null);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selectedBuilding = useSelector(selectActiveBuilding);
    const selectedPath = useSelector(selectActivePath);

    // const buildingMapData = props.route.params.buildingMapData;
    // const mapSvgData = props.route.params.mapSvgData;
    // const initialFloorIndex = props.route.params.floorIndex;
    // const building = props.route.params.building;
    // const selectedPath = props.route.params.selectedPath;

    const [loading,setLoading] = useState(true);
    const [floorIndex,setFloorIndex] = useState(0);


    const exitNavigation = () => {

    }

    const stopNavigation = () => {

    }

    const resumeNavigation = () => {
        
    }

    const startNavigation = () => {

    }

    const startVoiceDirections = () => {

    }

    useEffect(()=>{ 
        async function centerOnUser(){
            
        }
        centerOnUser();
        startNavigation();
        startVoiceDirections()
    },[])

    const displayNextDirectionStep = () => {

    }

    const reCenter = () => {

    }

    const overView = () => {

    }

    const addAStop = () => {

    }

    const displayPOISByCategory = () => {

    }

    const Report = () => {
        
    }


    const onBackHandlerNavigationStop = () => {
        console.log('Keep Running Pressed')
        exitNavigation()
        navigation.goBack()        
    }

    const onBackHandlerNavigationStay = () => {

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
                    onPress: () =>  onBackHandlerNavigationStay(),
                    style: 'cancel'
                },
                { text: 'Stop', onPress: () => onBackHandlerNavigationStop() }
            ],
            { cancelable: false }
        );        
    }

    useEffect(() => {
        const backAction = () => {
            
          // Return true to prevent default behavior (closing the app)
          // Return false to allow default behavior (close the app)
          // Replace the below logic with your custom behavior
          confirmationStop();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
    
      }, []); 

      useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (
                appState.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                if (wasInBackground && keepRunning) {
                    onForegroundNavigationContinue()
                }
            } else if (nextAppState === 'background') {
                confirmationExit();
            }
            setAppState(nextAppState);
        };

        AppState.addEventListener('change', handleAppStateChange);
      },[appState])


      useFocusEffect(
        useCallback(() => {
          const onBeforeRemove = (e) => {
            e.preventDefault();
    
            Alert.alert(
              'Exit Confirmation',
              'Are you sure you want to exit the app?',
              [
                { text: 'Cancel', style: 'cancel', onPress: () => {} },
                {
                  text: 'OK',
                  onPress: () => navigation.dispatch(e.data.action),
                },
              ]
            );
          };
    
          navigation.addListener('beforeRemove', onBeforeRemove);
    
          return () => {
            navigation.removeListener('beforeRemove', onBeforeRemove);
          };
        }, [navigation])
      );

      useEffect(() => {
        
        const handleMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };
        const websocketClient = new WebsocketClient();
        // websocketClient.on('message', handleMessage);

        // Open WebSocket when the component mounts
        websocketClient.connect().catch((error) => {
            console.error('Failed to connect WebSocket:', error);
        });

        // Clean up WebSocket when the component unmounts
        return () => {
            // websocketClient.off('message', handleMessage);
            websocketClient.disconnect();
        };
        }, []);


    return (
        <View style={{
            flex:1,
        }}>
            <TouchableOpacity >
                <Text style={{
                    fontSize:30,
                    color:"black"
                }}>
                    Building Navigation
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BuildingNavigationScreen;