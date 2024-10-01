import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, Text,Animated,Easing, StyleSheet  } from 'react-native';
import useLoadingMessages from '../../../../hooks/useLoadingMessages';

const LoadingMessagesWidget = () => {
    const {loadingMessages} = useLoadingMessages();
    const [dots, setDots] = useState('.');

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

    return (
        <View style={{
            flexDirection:"column-reverse",
        }}>
            {loadingMessages && loadingMessages.map((loadingMessage,index)=>{
                return (
                    <Animated.View key={loadingMessage.messageId} >
                        <View style={styles.container}>
                            <ActivityIndicator color={"black"} />
                            <Text style={styles.text}>
                                {loadingMessage.message}{dots}
                            </Text>
                        </View>
                    </Animated.View>                    
                )
            })}

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center"
    },
    text:{
        color: "black",
        marginLeft: 5,
        fontSize:16,
    }
})

export default LoadingMessagesWidget;
