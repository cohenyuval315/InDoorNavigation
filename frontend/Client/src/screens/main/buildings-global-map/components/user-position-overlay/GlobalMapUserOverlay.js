import React,{ useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import PulsingCircle from "./PulsingCircle";
import UserMapAvatar from "./UserMapAvatar";
import useGPS from "../../../../../hooks/useGPS";
import {getRelativeCoordsByIsrael  } from "../../../../../static-maps/israel";
import useLoadingMessages from "../../../../../hooks/useLoadingMessages";
import MapOverlay from "../../../../../layouts/map-overlay";
import { GeolocationService } from "../../../../../sensors/gps-service";
import { useFocusEffect } from "@react-navigation/native";


const GlobalMapUserOverlay = () => {
    const {addLoadingMessage} = useLoadingMessages();
    const userMapCoordinates = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [isInitialPositionSet, setIsInitialPositionSet] = useState(false);
    const startMessageCallbackRef = useRef(null);
    const retryMessageCallbackRef = useRef(null);


    const onPosition = (position) => {
        if (!position){
            return;
        }
        const { latitude, longitude } = position.coords;
        const newCoordinates = getRelativeCoordsByIsrael({ latitude, longitude });        
        console.log("UserCoords",newCoordinates)
        if (retryMessageCallbackRef.current){
            retryMessageCallbackRef.current()
        }
        if (startMessageCallbackRef.current){
            startMessageCallbackRef.current()
        }
        if (!isInitialPositionSet) {
            userMapCoordinates.setValue(newCoordinates);
            setIsInitialPositionSet(true);
          } else {
            Animated.timing(userMapCoordinates, {
              toValue: newCoordinates,
              duration: 500, // Adjust duration as needed
              easing: Easing.out(Easing.quad),
              useNativeDriver: false, // Animated.ValueXY doesn't support native driver
            }).start();
          }

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


    if (!isInitialPositionSet) {
        return null;
    }


    return (
        <MapOverlay styles={{
            
        }}>
            <Animated.View style={{
                position: "absolute",
                zIndex: 22,
                top: userMapCoordinates.y.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                }),
                left: userMapCoordinates.x.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                }),            
                justifyContent: "center",
                alignItems: "center",
            }}>
                <PulsingCircle/>
                <UserMapAvatar />
            </Animated.View>
        </MapOverlay>
    )
}

export default GlobalMapUserOverlay;