import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { NativeBaseProvider, Box } from 'native-base';

import Routes from './src/routes';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import Home from './src/pages/Home';

export default function App() {

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);
    return subscriber;
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#38C" barStyle={'light-content'} />          
        {/* {user ? <Home/> : <Routes />} */}
        <Routes />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}


