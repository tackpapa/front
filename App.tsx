import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {Provider} from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './store';
import { LogBox } from 'react-native';
import socket from './utils/socket'


LogBox.ignoreAllLogs(true);
socket.connectStore(store);
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />        
      </SafeAreaProvider>
      </PersistGate>
    </Provider>);
  }
}


