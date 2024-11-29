import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

import { useAppContext, useAuthContext } from '@/context';
import { LoadingScreen } from '@/screens';

export function Routes() {
  const { isLoading, user, } = useAuthContext()
  const { updateUserData } = useAppContext()
  useEffect(() => {
    async function LoadUser() {
      user && updateUserData(user)
      console.log(user);

    }
    LoadUser()
  }, [user])

  if (isLoading) { <LoadingScreen /> }

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent
      />
      {user ?
        <AppStack /> :
        <AuthStack />
      }
    </NavigationContainer>
  )
}