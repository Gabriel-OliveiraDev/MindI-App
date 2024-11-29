import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStack";
import { AppTabNavigatorParamList } from "./AppTabNavigator";
import { AuthStackParamList } from "./AuthStack";

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends
      AppStackParamList,
      AuthStackParamList,
      AppTabNavigatorParamList { }
  }
}

export type AppScreenProps<RouteName extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList & AuthStackParamList, RouteName>;

export type AppTabScreenProps<
  RouteName extends keyof AppTabNavigatorParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppTabNavigatorParamList, RouteName>,
    NativeStackScreenProps<AppStackParamList & AuthStackParamList, 'AppTabNavigator'>
  >;