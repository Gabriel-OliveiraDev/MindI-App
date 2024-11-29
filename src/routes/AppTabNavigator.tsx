import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@shopify/restyle'

import { HomeScreen, ProfileScreen, SettingsScreen } from '@screens'
import { Icon, Wave } from '@components'
import { Theme } from '@/theme'

export type AppTabNavigatorParamList = {
  HomeScreen: undefined,
  ProfileScreen: undefined,
  SettingsScreen: undefined
}

const Tab = createBottomTabNavigator<AppTabNavigatorParamList>();

export function AppTabNavigator() {
  const themeColor = useTheme<Theme>().colors
  return (
    <Tab.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        header: () => <Wave />,
        tabBarStyle: {
          backgroundColor: themeColor.primary,
          borderColor: themeColor.detail,
          height: 60,
        },
        tabBarInactiveTintColor: themeColor.tertiary,
        tabBarActiveTintColor: themeColor.White,
      }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Início',
          tabBarIcon: ({ color }) =>
            <Icon
              type='MaterialCommunityIcons'
              color={color}
              name='home'
              size={28}
            />,

        }}
      />
      <Tab.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) =>
            <Icon
              type='MaterialCommunityIcons'
              color={color}
              name='account'
              size={28}
            />,
        }}
      />
      <Tab.Screen
        name='SettingsScreen'
        component={SettingsScreen}
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) =>
            <Icon
              type='MaterialCommunityIcons'
              color={color}
              name='cog'
              size={26}
            />
        }}
      />
    </Tab.Navigator>
  )
}