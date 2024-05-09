import { useEffect, useRef } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import useAppStateListener, { AppStateListener } from './useAppStateListener';

type BackgroundTimerHookOptions = {
    interval: number;
    backgroundTask: (() => any);
};

export default function useBackgroundTimer(options: BackgroundTimerHookOptions) {
    const { interval, backgroundTask } = options;
    const appStateListeners: AppStateListener = {
        active: null,
        background: backgroundTask, // Set background task function to run when app is in background
        extension: null,
        inactive: null,
        unknown: null
    };

    const { startListening, stopListening } = useAppStateListener(appStateListeners);
    const backgroundTimerRef = useRef<number | null>(null);

    useEffect(() => {
        startListening(); // Start listening to app state changes
        backgroundTimerRef.current = BackgroundTimer.setInterval(backgroundTask, interval);

        return () => {
            stopListening(); // Stop listening to app state changes
            if (backgroundTimerRef.current) {
                BackgroundTimer.clearInterval(backgroundTimerRef.current);
                backgroundTimerRef.current = null;
            }
        };
    }, []);

    return {
        startListening,
        stopListening
    };
}
