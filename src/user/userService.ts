import firestore, { 
  getFirestore,  
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { UserProfile, CreateUserArgs } from './userProfile';

// The firestore database instance used as the main entry point for all Firestore operations
const db = getFirestore();

// Define default reading genres for new users
const defaultGenres = ['Romance', 'Accion', 'Harem'];

// Function to create a user profile in Firestore if it doesn't already exist
export const createUserProfileIfNeeded = async ({ 
  uid, 
  username, 
  email, 
  authProviders, 
  birthDate
}: CreateUserArgs): Promise<UserProfile> => {
  
  try {
    // Get the user document reference from Firestore using the provided UID
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef); // Usamos getDoc(userRef)
    
    // If the user document does not exist, create a new profile with default values
    if (!userDoc.exists()) {
      const newUserProfile: UserProfile = {
        uid: uid,
        username: username,
        email: email,
        birthDate: birthDate || '',
        favoriteGenres: defaultGenres,
        onBoardingCompleted: false,
        authProviders: authProviders,
      };
      // In case of a new user, we set the document with the new profile data and add a createdAt timestamp
      await setDoc(userRef, {
        ...newUserProfile,
        createdAt: serverTimestamp(), 
        // Use merge to avoid overwriting any existing fields if the document already exists
      }, { merge: true });
      // Return the newly created user profile
      return newUserProfile;
    }
    // If the user document already exists, return the existing profile data
    return userDoc.data() as UserProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

// Actualizar datos básicos del perfil
export const updateBasicProfile = async ({
  uid,
  username,
  birthDate,
}: {
  uid: string;
  username: string;
  birthDate: string;
}) => {
  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    username,
    birthDate,
  });
};

// Actualizar géneros favoritos
export const updateGenres = async ({
  uid,
  favoriteGenres,
}: {
  uid: string;
  favoriteGenres: string[];
}) => {
  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    favoriteGenres,
    onBoardingCompleted: true,
  });
};