import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import client from '../../../server/api-client';
import { useDispatch, useSelector } from "react-redux";
import { fetchBuildings, selectBuildingsError, selectBuildingsStatus } from "../../../app/building/buildings-slice";
import Status from "../../../app/status";
import Config from "../../../config/Config";
import ProgressBar from "../../../components/general/progress-bar";
import { useNavigation } from "@react-navigation/native";
import { useAppBoot } from "../../../contexts/AppBootContext";




const SplashScreen = () => {
    const dispatch = useDispatch();
    const buildingsStatus = useSelector(selectBuildingsStatus)
    const buildingsError = useSelector(selectBuildingsError)
    const navigation = useNavigation();
    const {success,failure} = useAppBoot()
    

    const {loadingTheme, loadInitialTheme} = useTheme();

    const [isSplashAnimation, setIsSplashAnimation] = useState(true);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeProgressAnim = useRef(new Animated.Value(0)).current;
    const buildingMessageRef = useRef(null);

    
    const [dataLoading,setDataLoading] = useState(true);

    const [progress, setProgress] = useState(0);
    const [messages, setMessages] = useState([]);
    const [serverIsUp, setIsServerUp] = useState(null);

    const numTasks = 3;
    const messageDelay = 500;
    const fadeDuration = 1000;
    const progressFadeDuration = 1000;

    const [error,setError] = useState(null);

    const createMessage = (id,msg)=> {
      const message = {
        id:id,
        message:msg
      }
      return message;

    }

    const deleteMessage = (id) => {
      setMessages(prev => prev.filter((p) => p.id !== id))
    }

    const addProgress = () => {
      setProgress(prev => (prev * numTasks + 1) / numTasks);
    }


    async function loadTheme() {
      try{
        const themeMessage = createMessage("theme","loading theme...")
        setMessages(prev => [...prev,themeMessage])
        const themeId = themeMessage.id
        await loadInitialTheme();
        addProgress();
        setTimeout(() => {
          deleteMessage(themeId);
        },messageDelay)
      }catch(error){
        console.error(error)
        return false;
      }
      return true;
    }

    async function pingServer(){
      try{
        const pingMessage = createMessage("ping","pinging server...")
        setMessages(prev => [...prev,pingMessage])
        const pingId = pingMessage.id
        const isServerUp = await client.ping();
        setIsServerUp(isServerUp);
        setTimeout(() => {
          deleteMessage(pingId);
        },messageDelay)
        if (isServerUp){
          addProgress();
        }else{
          return false;
        }
      }catch(error){
        return false;
      }
      return true;
    }

    async function load(){
      setError(null);
      const valueArrays = await Promise.all([
        loadTheme(),
        pingServer()
      ])
      valueArrays.forEach((val) => {
        
      })
    }

    async function loadServerData(){
      const serverValues = await Promise.all([
        fetchAllBuildings()
      ])
    }


    const fetchAllBuildings = async () => {
      const buildingMessage = createMessage("buildings","fetch buildings...")
      setMessages(prev => [...prev,buildingMessage])
      buildingMessageRef.current = buildingMessage.id;
      setTimeout(() => {
        dispatch(fetchBuildings())
      },messageDelay)
    }


    useLayoutEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: fadeDuration,
        useNativeDriver: true,
      }).start();
  
      const timer = setTimeout(() => {
        setIsSplashAnimation(false);
      }, Config.SPLASH_TIME_LENGTH);
  
      return () => clearTimeout(timer);
    }, [fadeAnim]);


    useEffect(() => {
      if(!isSplashAnimation){
        Animated.timing(fadeProgressAnim, {
          toValue: 1,
          duration: progressFadeDuration,
          useNativeDriver: true,
        }).start();
      }

    },[isSplashAnimation]);


    useEffect(() => {
      if(!isSplashAnimation){
        load()
      }
    },[isSplashAnimation])


    useEffect(() => {
      if(serverIsUp){
        loadServerData();        
      }
    }, [serverIsUp])

    useEffect(()=>{
      if(!serverIsUp){
        return;
      }

      switch(buildingsStatus){
          case Status.IDLE:{
              break;
          }
          case Status.PENDING: {
              break;
          }
          case Status.FAILED:{
              setError(buildingsError);
              setDataLoading(false);
              if(buildingMessageRef.current){
                deleteMessage(buildingMessageRef.current)
              }              
              break;
          }
          case Status.SUCCEEDED:{             
              setDataLoading(false);
              addProgress();
              if(buildingMessageRef.current){
                deleteMessage(buildingMessageRef.current)
              }
              break;
          }
      }

    },[dispatch,buildingsStatus, dataLoading,serverIsUp])


    useEffect(() => {
      if(progress == 1){
        navigation.navigate("buildings-global-map")
        success();
      }
    },[progress])

    useEffect(() => {
      if(serverIsUp !== null && serverIsUp === false){
        navigation.navigate("servers-down")
      }
    },[serverIsUp])


    return (     
        <View style={styles.container}>
            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                <Animated.Text style={[styles.text, { color: "black" }]}>
                  {Config.APP_SPLASH_SCREEN_TITLE}
                </Animated.Text>
            </Animated.View>
            <Animated.View style={[styles.indicatorsContainer, { opacity: fadeProgressAnim }]}>
              <Animated.View style={styles.messageContainer}>
                
                  {messages && messages.map((message,index) => {
                    return (
                      <Animated.Text key={`${message.id}_${index}`} style={[styles.message]}>
                        {message.message}
                      </Animated.Text>
                    )
                  })}
                
              </Animated.View>
              <View style={
                styles.progressBarContainer
              }>
                <ProgressBar
                    progress={progress}
                    initialProgress={0}
                />
              </View>
            </Animated.View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    messageContainer:{
      flex:1,
      padding:5,
      flexDirection:"column-reverse", 
      flexShrink:0,
      overflow:"hidden",
    },    
    message:{
      color:"black"
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent:"center",
      flex:1,
    },
    indicatorsContainer:{
      flex:1,
      // width:"100%",
      justifyContent:"center",
      margin:20,

      
    },
    progressBarContainer:{
      flex:1,
      height:"100%",
      flexDirection:"column",
    },
    animation: {
      width: 200,
      height: 200,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
    },
  });

export default SplashScreen;