import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export type AppStateListener = {
    active: (() => void) | null;
    background: (() => void) | null;
    extension: (() => void) | null;
    inactive: (() => void) | null;
    unknown: (() => void) | null;
};

type SetListenersFunction = (listeners: Partial<AppStateListener>) => void;

export default function useAppStateListener(initialListeners: AppStateListener = {
    active: null,
    background: null,
    extension: null,
    inactive: null,
    unknown: null
}): {
    startListening: () => void;
    stopListening: () => void;
    setListeners: SetListenersFunction;
} {
    const appState = useRef<AppStateStatus>(AppState.currentState);
    const [listeners, setListenersState] = useState<AppStateListener>(initialListeners);
    const [isListening, setIsListening] = useState(false);

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        const listener = listeners[nextAppState];
        if (listener) {
            listener();
        }
        appState.current = nextAppState;
    };

    const startListening = () => {
        setIsListening(true);
    };

    const stopListening = () => {
        setIsListening(false);
    };

    const setListeners: SetListenersFunction = (newListeners) => {
        setListenersState((prevListeners) => ({
            ...prevListeners,
            ...newListeners
        }));
    };

    useEffect(() => {
        if (!isListening) {
            return;
        }

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove(); // Clean up subscription
        };
    }, [isListening, listeners]);

    return {
        startListening,
        stopListening,
        setListeners
    };
}
