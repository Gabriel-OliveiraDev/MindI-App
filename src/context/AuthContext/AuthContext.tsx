import React, { useState, useEffect, createContext, useContext } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService, SignUpProps } from "@/services/Firebase/Auth";
import { UserType } from "@/@types";
import { Key } from '@constants';

interface AuthContextData {
  isLoading: boolean;
  user: UserType | null;
  signUp: (props: Omit<SignUpProps, "uid">) => Promise<UserType | null>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);


  // Carrega o usuário salvo no AsyncStorage ao iniciar o app
  useEffect(() => {
    setIsLoading(true);
    async function loadStoredUser() {
      try {
        const storedUser = await AsyncStorage.getItem(Key.USER_DATA_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário do AsyncStorage:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStoredUser();
  }, []);

  const saveUserToStorage = async (user: UserType) => {
    try {
      await AsyncStorage.setItem(Key.USER_DATA_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Erro ao salvar usuário no AsyncStorage:", error);
    }
  };

  const clearUserFromStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Erro ao remover usuário do AsyncStorage:", error);
    }
  };

  const signUp = async (props: Omit<SignUpProps, "uid">): Promise<UserType | null> => {
    setIsLoading(true);
    try {
      const newUser = await authService.signUp(props);
      if (newUser) {
        setUser(newUser);
        await saveUserToStorage(newUser);
      } else {
        Alert.alert("Erro", "Não foi possível criar a conta.");
      }
      return newUser;
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao criar a conta.");
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    console.log('Foi')
    try {
      const authenticatedUser = await authService.signIn({ email, password });
      if (authenticatedUser) {
        setUser(authenticatedUser);
        await saveUserToStorage(authenticatedUser);
        Alert.alert("Bem-vindo", "Login realizado com sucesso!");
      } else {
        Alert.alert("Erro", "Usuário não encontrado.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao realizar login.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      console.log(user);
      await clearUserFromStorage();
      Alert.alert("Até logo", "Você saiu da sua conta.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair da conta.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextData = {
    isLoading,
    user,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
