import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FIREBASE_KEY } from '@constants';
import { UserType } from '@/@types';

export interface SignInProps {
  email: string;
  password: string;
}

/**
 * Busca um usuário no Firestore com base no UID.
 */

async function findUser(uid: string): Promise<UserType | null> {
  try {
    const querySnapshot = await firestore()
      .collection(FIREBASE_KEY.USERS)
      .where('uid', '==', uid)
      .get();

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const data = userDoc.data();

      // Verifica se os campos obrigatórios estão presentes
      if (!data.email || !data.name || !data.createdAt || !data.language) {
        console.warn('Dados do usuário incompletos no Firestore');
        return null;
      }

      return {
        email: data.email,
        uid: uid,
        name: data.name,
        createdAt: data.createdAt.toDate(), // Converte Timestamp para Date
        language: data.language,
        photoURL: data.photoURL,
        phone: data.phone,
        birthdate: data.birthdate ? data.birthdate.toDate() : undefined,
      } as UserType;
    } else {
      console.warn('Usuário não encontrado no Firestore');
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar usuário no Firestore:', error);
    throw error;
  }
}

/**
 * Realiza o login de um usuário e retorna suas informações.
 */
export async function signIn(params: SignInProps): Promise<UserType | null> {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(params.email, params.password);

    const user = await findUser(userCredential.user.uid);

    if (user) {
      console.log('Usuário autenticado e encontrado:', user);
      return user;
    } else {
      console.warn('Usuário autenticado, mas não encontrado no Firestore');
      return null;
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error; // Permite tratamento externo do erro
  }
}
