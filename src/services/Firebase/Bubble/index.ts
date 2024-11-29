import firestore from "@react-native-firebase/firestore";
import { FIREBASE_KEY } from "@constants";

/**
 * Atualiza as informações do usuário no Firestore e no AsyncStorage.
 *
 * @param uid - UID do usuário que será atualizado.
 * @param updatedData - Dados atualizados do usuário.
 * @returns Retorna os dados atualizados do usuário.
 */
async function updateUser(uid: string) {
  try {
    // Atualizar no Firestore
    const userRef = firestore().collection(FIREBASE_KEY.BUBBLE).doc(uid);

    // Recuperar os dados atualizados
    const userDoc = await userRef.get();


    console.log("Informações do usuário atualizadas com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
}

async function loadBubbles() {
  try {

  } catch (error) {

  }
}
