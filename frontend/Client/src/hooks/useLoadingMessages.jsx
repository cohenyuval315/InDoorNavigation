import React, { useEffect ,useRef,useState} from 'react';
import { Animated, Easing } from 'react-native';

function useLoadingMessages(initialMessages=[]) {
    const [loadingMessages,setLoadingMessages] = useState(initialMessages);
    const [dots, setDots] = useState('.');
    const prevLoadingMessagesRef = useRef(initialMessages);
    const fadeAnim = useRef(new Animated.Value(1));
    const deletedMessages = useRef([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDots(prevDots => (prevDots === '...' ? '' : prevDots + '.'));
        }, 500);
        return () => clearInterval(intervalId);
    }, []);

    const animateMessages = () => {
        Animated.timing(fadeAnim.current, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(({ finished }) => {
            deletedMessages.current = [];
            prevLoadingMessagesRef.current = loadingMessages;
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
        animateMessages();
    }, [loadingMessages]);

    const addMessage = message => {
        setLoadingMessages(prevMessages => [...prevMessages, message]);
    };

    const removeMessageByIndex = index => {
        setLoadingMessages(prevMessages =>
            prevMessages.filter((_, i) => i !== index)
        );
    };
    const removeMessageByText = text => {
        setLoadingMessages(prevMessages =>
            prevMessages.filter((t, i) => t !== text)
        );
    };


    return { loadingMessages, dots, fadeAnim, deletedMessages, addMessage, removeMessageByIndex, removeMessageByText};
}
export default useLoadingMessages;
