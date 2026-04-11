import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

// Define the types for the user profile and related data structures
export type AuthProvider = "google.com" | "password";

//Create the general interface for the user profile
export interface UserProfile {
    uid: string;
    username: string;
    email: string;
    birthDate: string;
    favoriteGenres: string[];
    onBoardingCompleted: boolean;
    authProviders: AuthProvider[];
    createdAt?: FirebaseFirestoreTypes.FieldValue;
}

// Define the required arguments for creating a user profile
export interface CreateUserArgs {
    uid: string;
    username: string;
    email: string;
    authProviders: AuthProvider[];
    birthDate?: string;
    onBoardingCompleted?: boolean;
}