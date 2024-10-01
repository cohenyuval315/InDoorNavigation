import React,{ useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from "react-native";
import PulsingCircle from "./PulsingCircle";
import UserMapAvatar from "./UserMapAvatar";
import useLoadingMessages from "../../../../hooks/useLoadingMessages";
import MapOverlay from "../../../../layouts/map-overlay";
import { GeolocationService } from "../../../../services/GpsService";
import { useFocusEffect } from "@react-navigation/native";
import { getRelativeCoordsByIsrael } from "../../../../static-maps/israel/israel";


const GlobalMapUserOverlay = () => {
    const {removeLoadingMessage,addLoadingMessageId} = useLoadingMessages();
    const [userMapCoordinates,setUserMapCoordinates] = useState(null);;
    const m = useRef(null);
    const size = 10;



    const onPosition = (position) => {
        removeLoadingMessage(m.current)
        if (!position){
            return;
        }
        const { latitude, longitude } = position.coords;
        const newCoordinates = getRelativeCoordsByIsrael({ latitude, longitude });        
        setUserMapCoordinates(newCoordinates)

    }

    const onPositionError = (error) => {

        
    }
    useFocusEffect(
        useCallback(() => {
            m.current = addLoadingMessageId("loading user geo positon");
            GeolocationService.getInstance().startStream({
                distanceFilter:100,
                enableHighAccuracy:true,
                maximumAge:0,
                timeout:100,
                useSignificantChanges:false,
            })
            const sub = GeolocationService.getInstance().subscribeGeoLocation({
                next:onPosition,
                error:onPositionError
            })
            

            return () => {
                sub.unsubscribe();
            }
        },[])
    );


    if (!userMapCoordinates) {
        return null;
    }


    return (
        <MapOverlay styles={{
            width:"100%",
        }}>
            <Animated.View style={{
                position: "absolute",
                zIndex: 22,
                top: `${userMapCoordinates.y}%`,
                left: `${userMapCoordinates.x}%`,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                
                justifyContent: "center",
                alignItems: "center",
            }}>
                
                <PulsingCircle/>
                <UserMapAvatar size={size} />
            </Animated.View>
        </MapOverlay>
    )
}

export default GlobalMapUserOverlay;