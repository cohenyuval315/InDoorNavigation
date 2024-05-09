import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { SERVER_URL } from './temp';

function useServerStatus(intervalInMs=5000) {
  const [interval,setInterval] = useState(intervalInMs);
  const [loadingServerStatus, setLoadingServerStatus] = useState(true);
  const [isServerOnline,setIsServerOnline] = useState(true);

  const onOffline = () => {
    setIsServerOnline(false);
    Alert.alert("Offline", "Server is Offline", [{ text: 'OK', onPress: () => {} }]);
  }

  const checkServerStatus = async () => {
    try {
      setLoadingServerStatus(true);
      const response = await fetch(SERVER_URL);
      if (response.ok){
        setIsServerOnline(true);
      }else{
        onOffline();
      }
    } catch (error) {
      onOffline();
    } finally {
      setLoadingServerStatus(false);
    }
  }

  useEffect(()=>{
    const intervalId = setInterval(checkServerStatus,interval);
    return () => {
      clearInterval(intervalId);
    }
  },[])


  



  return {
    isServerOnline,
    checkServerStatus,
    loadingServerStatus,
    setInterval
  }
}
export default useServerStatus;
