import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, Text,Animated,Easing  } from 'react-native';
import useLoadingMessages from '../../../../../hooks/useLoadingMessages';


const GlobalMapLoadingOverlay = () => {
    const {loadingMessages} = useLoadingMessages()
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
        return () => {
            fadeAnim.current.stopAnimation();
        }
    }, [loadingMessages]);


    return (
        <View style={{
            position: "absolute",
            left: "3%",
            bottom: "16%",
            flexDirection:"column-reverse"
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
                            alignItems: "center"
                        }}>
                            <ActivityIndicator color={"black"} />
                            <Text style={{
                                color: "black",
                                marginLeft: 5,
                                fontSize:16,
                            }}>
                                {loadingMessage}{dots}
                            </Text>
                        </View>
                    </Animated.View>                    
                )
            })}

        </View>
    );
}

export default GlobalMapLoadingOverlay;
