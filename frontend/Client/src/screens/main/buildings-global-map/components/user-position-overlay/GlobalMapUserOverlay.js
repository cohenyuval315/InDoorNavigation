import React,{ useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from "react-native";
import PulsingCircle from "./PulsingCircle";
import UserMapAvatar from "./UserMapAvatar";
import useGPS from "../../../../../hooks/useGPS";
import {getRelativeCoordsByIsrael  } from "../../../../../static-maps/israel";
import useLoadingMessages from "../../../../../hooks/useLoadingMessages";
import MapOverlay from "../../../../../layouts/map-overlay";
import { GeolocationService } from "../../../../../services/GpsService";
import { useFocusEffect } from "@react-navigation/native";


const GlobalMapUserOverlay = () => {
    const {addLoadingMessage} = useLoadingMessages();
    const [userMapCoordinates,setUserMapCoordinates] = useState(null);;
    const startMessageCallbackRef = useRef(null);
    const retryMessageCallbackRef = useRef(null);
    const size = 10;


    const onPosition = (position) => {
        if (!position){
            return;
        }
        const { latitude, longitude } = position.coords;
        const newCoordinates = getRelativeCoordsByIsrael({ latitude, longitude });        
        if (retryMessageCallbackRef.current){
            retryMessageCallbackRef.current()
        }
        if (startMessageCallbackRef.current){
            startMessageCallbackRef.current()
        }
        setUserMapCoordinates(newCoordinates)

    }

    const onPositionError = (error) => {
        console.log(error);
        if (startMessageCallbackRef.current){
            startMessageCallbackRef.current()
        }        
        if (retryMessageCallbackRef.current == null){
            retryMessageCallbackRef.current = addLoadingMessage("retrying user geo position")
        }
        
    }
    useFocusEffect(
        useCallback(() => {
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
            startMessageCallbackRef.current = addLoadingMessage("loading user geo positon");

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