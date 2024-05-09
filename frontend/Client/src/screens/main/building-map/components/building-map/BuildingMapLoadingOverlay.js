import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, Text,Animated,Easing  } from 'react-native';


const BuildingMapLoadingOverlay = ({loadingMessages}) => {
    const [dots, setDots] = useState('.');
    const prevLoadingMessagesRef = useRef(loadingMessages);
    const fadeAnim = useRef(new Animated.Value(1));
    const deletedMessages = useRef([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDots(prevDots => {
                if (prevDots === '...') {
                    return '';
                } else {
                    return prevDots + '.';
                }
            });
        }, 500);
        return () => clearInterval(intervalId);
    }, []); 

    useEffect(() => {
        const messagesChanges = [];
        loadingMessages.forEach((message, index) => {
            if (prevLoadingMessagesRef.current[index] !== message) {
                messagesChanges.push(index);
            }
        });
        deletedMessages.current = messagesChanges;
        // setDeleted(messagesChanges);
        animateMessages();
    }, [loadingMessages]);





    const animateMessages = () => {
        Animated.timing(fadeAnim.current, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(({finished })=>{
            // setDeleted([]);
            deletedMessages.current = [];
            prevLoadingMessagesRef.current = loadingMessages
            
            // fadeAnims.current = Array.from({ length: loadingMessages.length }, () => new Animated.Value(1));
        });
        
    };


    return (
        <View style={{
            position: "absolute",
            flexDirection:"column-reverse",
            bottom:"13%",
            left:"30%"
        }}>
            {prevLoadingMessagesRef.current.map((loadingMessage,index)=>{
                return (
                    <Animated.View key={index} style={{
                        opacity: deletedMessages.current.includes(index) ? 
                        fadeAnim.current.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                        })
                         : 1,
                        transform: [
                            {
                                translateY: 0
                            }
                        ]
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent:"center"
                        }}>
                            <ActivityIndicator color={"black"} />
                            <Text style={{
                                textAlign:"center",
                                color: "black",
                                marginLeft: 5,
                                fontSize:16,
                            }}
                            numberOfLines={1}
                            >
                                {loadingMessage}{dots}
                            </Text>
                        </View>
                    </Animated.View>                    
                )
            })}

        </View>
    );
}

export default BuildingMapLoadingOverlay;
