import { GoogleSignin, statusCodes, isErrorWithCode } from '@react-native-google-signin/google-signin';
import { getAuth, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';

export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId: '771651338466-1c4c0perb1sbng1odfdpspn34gt9n7v1.apps.googleusercontent.com',
  });
}

export async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const signInResult = await GoogleSignin.signIn();

    let idToken = signInResult.data?.idToken;
    if (!idToken) {
      idToken = signInResult.idToken;
    }

    if (!idToken) {
      throw new Error('No se obtuvo el idToken de Google');
    }

    const googleCredential = GoogleAuthProvider.credential(idToken);
    return await signInWithCredential(getAuth(), googleCredential);
  } catch (error: any) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          throw new Error('Ya hay un inicio de sesión en progreso');
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          throw new Error('Google Play Services no está disponible o está desactualizado');
        default:
          throw error;
      }
    }
    throw error;
  }
}