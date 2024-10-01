import React from 'react';
import { Provider } from 'react-redux';
import store from './src/app/store';
import AppProviders from './src/contexts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Application from './src/main';

function App(): JSX.Element {
  return (    
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AppProviders>
          <Application/>
        </AppProviders>
      </Provider>
    </GestureHandlerRootView>
  );
}
export default App;
