import auth from '@react-native-firebase/auth'

export async function signOut() {
  auth().signOut().then(() => {
    console.log('User signed out!');
  })
}