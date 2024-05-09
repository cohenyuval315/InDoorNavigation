import React, { useEffect, useState } from 'react';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';


function useInternetConnection() {
  const [loadingInternetStatus, setLoadingInternetStatus] = useState(false);
  const [isConnectedToInternet,setIsConnectedToInternet] = useState(true);

  const onNoConnection = () => {
    Alert.alert("No Internet", "no internet connection",[      {text: 'OK', onPress: () => {}},]);
  }

  const subscribe = () =>{
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnectedToInternet(state.isConnected);
      if(state.isConnected === false){
        onNoConnection()
      }
    });
    return unsubscribe
  }

  useEffect(()=>{
    const unsubscribe = subscribe();
    return () => {
      unsubscribe();
    }
  },[])





  return {
    loadingInternetStatus,
    isConnectedToInternet,
    subscribe
  }
}
export default useInternetConnection;
