import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppTabNavigator } from './AppTabNavigator';
import {
  AboutScreen,
  BubbleScreen,
  EditProfileScreen,
  FocusScreen,
  InfoScreen,
  MedicationHistoryScreen,
  MedicationScreen,
  MeditationScreen,
  TermsScreen,
  BubbleHistoryScreen
} from '@screens';
import { Wave } from '@components';

export type AppStackParamList = {
  AppTabNavigator: undefined;
  // Home
  InfoScreen: undefined;
  // Functions
  MeditationScreen: undefined;
  MedicationScreen: undefined;
  BubbleScreen: undefined;
  FocusScreen: undefined;
  BubbleHistoryScreen: undefined;
  // Profiles
  PersonScreen: undefined;
  EditProfileScreen: undefined;
  // Settings
  TermsScreen: undefined;
  AboutScreen: undefined;
  MedicationHistoryScreen: undefined;
}

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName='AppTabNavigator'
      screenOptions={{
        headerShown: true,
        header: (headerProps) => <Wave headerProps={headerProps} />
      }}
    >
      <Stack.Screen
        name="AppTabNavigator"
        component={AppTabNavigator}
        options={{ headerShown: false, title: "Início" }}
      />
      <Stack.Screen name="MeditationScreen" component={MeditationScreen} />
      <Stack.Screen name="InfoScreen" component={InfoScreen} />

      <Stack.Screen name="MedicationScreen"
        options={{ title: "Cadastrar Medicação" }}
        component={MedicationScreen}
      />

      <Stack.Screen name="FocusScreen" component={FocusScreen} />
      <Stack.Screen name="BubbleScreen" component={BubbleScreen} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="BubbleHistoryScreen" component={BubbleHistoryScreen} />

      <Stack.Screen
        component={MedicationHistoryScreen}
        name="MedicationHistoryScreen"
      />
    </Stack.Navigator>
  )
}