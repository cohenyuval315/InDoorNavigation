import React, { useEffect, useState } from 'react';
import { isMapServiceAvailable } from '../services/3rd-party/map-service-provider';

function useMapService() {
    const [loadingMapServiceStatus,setLoadingMapServiceStatus] = useState(false);
    const [isMapServiceInstalled,setIsMapServiceInstalled] = useState(null);

    const checkMapServiceStatus = async () => {
        setLoadingMapServiceStatus(true);
        const response = await isMapServiceAvailable();
        setIsMapServiceInstalled(response)
        setLoadingMapServiceStatus(false);
    }

    useEffect(()=>{
        checkMapServiceStatus();
    },[])

    return {
        checkMapServiceStatus,
        loadingMapServiceStatus,
        isMapServiceInstalled        
    }
}
export default useMapService;


