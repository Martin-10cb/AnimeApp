import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId: '771651338466-9hl2ng0ub8hqguujnmaid69206jca7kc.apps.googleusercontent.com',
    iosClientId: '771651338466-t9cih5qp17dmhkk49jbjtbjmapld6r7g.apps.googleusercontent.com'
  });
}

export async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const signInResult = await GoogleSignin.signIn();

    const idToken = signInResult.data?.idToken;

    if (!idToken) {
      throw new Error('No se obtuvo el idToken de Google');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  } catch (error: any) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          throw new Error('Ya hay un inicio de sesión en progreso');
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          throw new Error(
            'Google Play Services no está disponible o está desactualizado',
          );
        default:
          throw error;
      }
    }

    throw error;
  }
}