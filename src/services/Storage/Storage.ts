import AsyncStorage from "@react-native-async-storage/async-storage";
import { Key } from "@/constants";
import { ThemeType, UserType } from "@types";

// Atualiza os dados do usuário
async function updateUser(userData: UserType): Promise<void> {
  const stringified = JSON.stringify(userData);
  try {
    await AsyncStorage.setItem(Key.USER_DATA_KEY, stringified);
  } catch (error) {
    console.error("Erro ao atualizar os dados do usuário no AsyncStorage:", error);
  }
}

// Obtém os dados do usuário
async function getUser(): Promise<UserType | null> {
  try {
    const storedUser = await AsyncStorage.getItem(Key.USER_DATA_KEY);
    return storedUser ? JSON.parse(storedUser) as UserType : null;
  } catch (error) {
    console.error("Erro ao obter os dados do usuário do AsyncStorage:", error);
    return null;
  }
}

// Atualiza o tema
async function updateTheme(updatedTheme: ThemeType): Promise<void> {
  const stringified = JSON.stringify(updatedTheme);
  try {
    await AsyncStorage.setItem(Key.THEME_KEY, stringified);
    
  } catch (error) {
    console.error("Erro ao atualizar o tema no AsyncStorage:", error);
  }
}

// Obtém o tema
async function getTheme(): Promise<ThemeType | null> {
  try {
    const storagedTheme = await AsyncStorage.getItem(Key.THEME_KEY);
    return storagedTheme ? JSON.parse(storagedTheme) as ThemeType : null;
  } catch (error) {
    console.error("Erro ao obter o tema do AsyncStorage:", error);
    return null;
  }
}

export const StorageService = {
  updateUser,
  getUser,
  updateTheme,
  getTheme,
};
