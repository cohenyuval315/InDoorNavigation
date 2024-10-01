import React, { useEffect, useState } from 'react';
import NetInfo from "@react-native-community/netinfo";


function useInternetConnection(onNoConnection=null,onConnection=null,onReconnect=null) {
  const [isConnectedToInternet,setIsConnectedToInternet] = useState(true);

  const handleOnNoConnection = () => {
    onNoConnection && onNoConnection()
  }
  const handleOnConnection = () => {
    onConnection && onConnection()
  }
  const handleOnReconnect = () => {
    onReconnect && onReconnect()
  }


  useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setIsConnectedToInternet(false);
        handleOnNoConnection()
      } else {
        if (!isConnectedToInternet){
          handleOnReconnect();
        }
        setIsConnectedToInternet(true);
        handleOnConnection()
      }
    });
    return () => {
      unsubscribe();
    }
  },[])


  return {
    isConnectedToInternet,
  }
}
export default useInternetConnection;
