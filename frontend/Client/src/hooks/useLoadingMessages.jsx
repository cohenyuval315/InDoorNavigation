import React, { useEffect ,useRef,useState} from 'react';
import { Animated, Easing } from 'react-native';
import { useLoadingMessagesContext } from '../contexts/LoadingMessagesContext';

function useLoadingMessages() {
    const {loadingMessages,addLoadingMessage,resetLoadingMessage} = useLoadingMessagesContext()
    
    return { loadingMessages, addLoadingMessage,resetLoadingMessage};
}
export default useLoadingMessages;
