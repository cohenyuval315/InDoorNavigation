import React from 'react';
import AppPreLoading from './src/preloader/AppPreLoading';
import { Provider } from 'react-redux';
import store from './src/app/store';
import AppProviders from './src/contexts/AppProviders';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): JSX.Element {
  return (    
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AppProviders>
          <AppPreLoading />
        </AppProviders>
      </Provider>
    </GestureHandlerRootView>
  );
}
export default App;
