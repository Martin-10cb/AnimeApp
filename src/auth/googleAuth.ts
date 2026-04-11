import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from '@react-native-google-signin/google-signin';
import auth, {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from '@react-native-firebase/auth';

// Configuration function to set up Google Sign-In with the appropriate client IDs for both Android and iOS platforms
export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId:
      '771651338466-9hl2ng0ub8hqguujnmaid69206jca7kc.apps.googleusercontent.com',
    iosClientId:
      '771651338466-t9cih5qp17dmhkk49jbjtbjmapld6r7g.apps.googleusercontent.com',
  });
}

// Function to handle the Google Sign-In process, including error handling for common issues that may arise during authentication
export async function signInWithGoogle() {
  try {
    // Check if Google Play Services are available and up to date on the device before attempting to sign in
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    // Start the Google Sign-In process and retrieve the user's credentials, including the ID token needed for Firebase authentication
    const signInResult = await GoogleSignin.signIn();
    const idToken = signInResult.data?.idToken;
    // If the ID token is not obtained, throw an error to indicate that the Google Sign-In process failed
    if (!idToken) {
      throw new Error('No se obtuvo el idToken de Google');
    }
    // Create a Google credential using the obtained ID token, which will be used to authenticate with Firebase
    const googleCredential = GoogleAuthProvider.credential(idToken);
    // Use the Google credential to sign in to Firebase, allowing the user to authenticate with their Google account
    return await signInWithCredential(getAuth(), googleCredential);
  } catch (error) {
    // Handle specific error cases related to the Google Sign-In process, providing user-friendly error messages for common issues such as an ongoing sign-in process or unavailable Google Play Services
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
