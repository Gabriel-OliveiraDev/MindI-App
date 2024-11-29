import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignUpScreen, SignInScreen } from '@screens';
import { Wave } from '@components';

const Stack = createNativeStackNavigator();

export type AuthStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
}

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      header: () => <Wave />
    }}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  )
}