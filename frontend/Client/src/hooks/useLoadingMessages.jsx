import React, { useEffect ,useRef,useState} from 'react';
import { Animated, Easing } from 'react-native';
import { useLoadingMessagesContext } from '../contexts/LoadingMessagesContext';

function useLoadingMessages() {
    const {loadingMessages,addLoadingMessage} = useLoadingMessagesContext()
    
    return { loadingMessages, addLoadingMessage};
}
export default useLoadingMessages;
