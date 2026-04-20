import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  getAuth,
  onAuthStateChanged,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';

import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SelectGenresScreen from '../screens/SelectGenreScreen';
import CompleteProfileScreen from '../screens/CompleteProfileScreen';
import { DrawerNavigation } from './BottomTabNavigator';



export type RootStackParams = {
  StartScreen: undefined;
  LoginScreen: undefined;
  DrawerNavigation: undefined;
  RegisterScreen: undefined;
  SelectGenresScreen: undefined;
  CompleteProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  // Dentro de tu componente StackNavigator
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const subscriber = onAuthStateChanged(auth, userState => {
      setUser(userState);
      if (initializing) setInitializing(false);
    });
    return subscriber; // Limpieza al desmontar
  }, [initializing]);
  if (initializing) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // --- RUTAS PARA USUARIOS LOGUEADOS ---
        // Si el usuario ya inició sesión, la app entra directo aquí
        <Stack.Group>
          <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
          {/* Agrega aquí otras pantallas internas si las tienes */}
        </Stack.Group>
      ) : (
        // --- RUTAS DE AUTENTICACIÓN ---
        <Stack.Group>
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="SelectGenresScreen"
            component={SelectGenresScreen}
          />
          <Stack.Screen
            name="CompleteProfileScreen"
            component={CompleteProfileScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
