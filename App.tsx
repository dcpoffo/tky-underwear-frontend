/* eslint-disable */
import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#38C" barStyle={'light-content'} /> 
        <Routes />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
