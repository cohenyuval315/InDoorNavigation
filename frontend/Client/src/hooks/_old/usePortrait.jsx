import React, { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';

function usePortrait() {
    useEffect(()=>{
        Orientation.lockToPortrait(); 
    },[])

    return {
    }
}
export default usePortrait;
