import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

import React, { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

export default function App() {

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);
    return subscriber;
  }, []);


  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#38C" barStyle={'light-content'} />
      {/* {user ? <Home/> : <Routes />} */}
    <Routes/>
    </NavigationContainer>
  );
}


