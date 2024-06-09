import { useEffect, useRef, useState } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from '@react-native-community/geolocation';
import { AppState } from 'react-native';

export function useBackgroundTimer(backgroundTask,interval) {
  const appState = useRef(AppState.currentState);
  const [backgroundListener, setBackgroundListener] = useState(false);

  useEffect(() => {
    if (!backgroundListener) {
      return;
    }

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        BackgroundTimer.runBackgroundTimer(() => {
          backgroundTask()
        }, interval);
      } else {
        BackgroundTimer.stopBackgroundTimer();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [backgroundListener, onSuccess, onError]);

  return {
    backgroundListener,
    toggleBackgroundListener: () => setBackgroundListener(!backgroundListener),
  };
}
