import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { FIREBASE_KEY } from '@constants';
import { UserType } from '@/@types';

export interface SignUpProps {
  uid: string;
  name: string;
  email: string;
  language: string;
  password: string;
}

/**
 * Cria o usuário no Firestore
 */
async function createUser(params: Omit<SignUpProps, 'password'>): Promise<UserType | null> {
  try {
    const userDoc = await firestore()
      .collection(FIREBASE_KEY.USERS)
      .doc(params.uid) // Use o UID como ID do documento para evitar duplicados
      .set({
        ...params,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    return {
      uid: params.uid,
      email: params.email,
      name: params.name,
      language: params.language,
      createdAt: new Date(),
    } as UserType;
  } catch (error) {
    console.error('Error creating user in Firestore:', error);
    return null;
  }
}

/**
 * Registra um novo usuário no Firebase Auth e cria o registro no Firestore
 */
export async function signUp(params: Omit<SignUpProps, 'uid'>): Promise<UserType | null> {
  console.log('bate aqui');
  
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(params.email, params.password);

    // Após criar o usuário no Auth, crie no Firestore
    const newUser = await createUser({
      uid: userCredential.user.uid,
      email: params.email,
      name: params.name,
      language: params.language,
    });

    return newUser;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error; // Rejeite a promise para tratamento externo
  }
}
