import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';

import TabNavigator from './navigation/TabNavigator';
import AuthNavigator from './navigation/AuthNavigator';

import { AppProvider } from './services/AppContext';

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  if (user === undefined) return null; 

  return (
    <AppProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          {user ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}