import React, { useState, useContext, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType, NotificationType } from '@types';
import { Key } from '@constants';
import { userService } from '@/services/Firebase/User';

interface AppContextData {
  userData: UserType | null;
  updateUserData: (user: Partial<UserType>) => void;
  userNotifications: NotificationType[];
  addNotification: (notification: NotificationType) => void;
  removeNotification: (notificationId: number) => void;
}

interface AppProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextData>({
  userData: {} as UserType,
  updateUserData: () => { },
  userNotifications: [],
  addNotification: () => { },
  removeNotification: () => { },
});

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}

export function AppProvider({ children }: AppProviderProps) {
  const [userData, setUserData] = useState<UserType>({} as UserType);
  const [userNotifications, setUserNotifications] = useState<NotificationType[]>([]);

  // Load UserData
  useEffect(() => {
    async function loadUserData() {
      const loadedUser = await userService.loadUserFromStorage()
      loadedUser && setUserData(loadedUser)
    }
    loadUserData();
  }, []);

  // Load Notifications
  useEffect(() => {
    async function loadNotifications() {
      try {
        const storedNotifications = await AsyncStorage.getItem(Key.NOTIFICATIONS_KEY);
        if (storedNotifications) {
          setUserNotifications(JSON.parse(storedNotifications));
        }
      } catch (error) {
        console.log('Erro ao carregar notificações do AsyncStorage', error);
      }
    }

    loadNotifications();
  }, []);

  // User
  async function updateUserData(updatedData: Partial<UserType>) {
    const updatedUser = await userService.updateUser(userData.uid, updatedData);
    setUserData(updatedUser);
  }

  // Notifications
  async function addNotification(notification: NotificationType) {
    setUserNotifications((prevNotifications) => {
      const updatedNotifications = [...prevNotifications, notification];
      AsyncStorage.setItem(Key.NOTIFICATIONS_KEY, JSON.stringify(updatedNotifications));
      return updatedNotifications;
    });
  }

  async function removeNotification(notificationId: number) {
    setUserNotifications((prevNotifications) => {
      const updatedNotifications = prevNotifications.filter(
        (notification) => notification.id !== notificationId
      );
      AsyncStorage.setItem(Key.NOTIFICATIONS_KEY, JSON.stringify(updatedNotifications));
      return updatedNotifications;
    });
  }

  const value: AppContextData = {
    userData,
    userNotifications,
    addNotification,
    removeNotification,
    updateUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
