import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_KEY, Key } from "@constants";
import { UserType } from "@/@types";

const STORAGE_KEY = Key.USER_DATA_KEY

/**
 * Atualiza as informações do usuário no Firestore e no AsyncStorage.
 *
 * @param uid - UID do usuário que será atualizado.
 * @param updatedData - Dados atualizados do usuário.
 * @returns Retorna os dados atualizados do usuário.
 */
async function updateUser(
  uid: string,
  updatedData: Partial<Omit<UserType, "uid">>
): Promise<UserType> {
  try {
    // Atualizar no Firestore
    const userRef = firestore().collection(FIREBASE_KEY.USERS).doc(uid);
    await userRef.update(updatedData);

    // Recuperar os dados atualizados
    const userDoc = await userRef.get();
    const updatedUser = {
      uid,
      ...userDoc.data(),
    } as UserType;

    // Atualizar no AsyncStorage
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));

    console.log("Informações do usuário atualizadas com sucesso!");
    return updatedUser;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
}

/**
 * Carrega as informações do usuário salvas no AsyncStorage.
 *
 * @returns Os dados do usuário armazenados localmente ou `null`.
 */
async function loadUserFromStorage(): Promise<UserType | null> {
  try {
    const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Erro ao carregar usuário do AsyncStorage:", error);
    return null;
  }
}

export const userService = {
  updateUser,
  loadUserFromStorage,
}