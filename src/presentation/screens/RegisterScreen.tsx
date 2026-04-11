import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { hexToRgba } from '../../helpers/utils/color';
import GeneralTitle from '../../components/generalTitle';
import ButtonText from '../../components/buttonText';
import { useTheme } from '../../theme/useTheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigation/StackNavigator';
import GeneralIcon from '../../components/generalIcon';
import GeneralText from '../../components/generalText';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createUserProfileIfNeeded } from '../../user/userService';
import { signInWithGoogle } from '../../auth/googleAuth';
import auth from '@react-native-firebase/auth';

interface Props
  extends NativeStackScreenProps<RootStackParams, 'RegisterScreen'> {}

export default function RegisterScreen({ navigation }: Props) {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const { colors } = useTheme();

  const heroHeight = isTablet ? height * 0.4 : height * 0.3;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  const formattedDate = date ? date.toLocaleDateString('es-MX') : '';

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoadingGoogle(true);
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
      const { displayName, email, uid } = user;
      if (!displayName || !email) {
        throw new Error(
          'La cuenta de Google no tiene la información necesaria (Nombre o Email).',
        );
      }
      // Create the user profile
      const userProfile = await createUserProfileIfNeeded({
        uid: uid,
        username: displayName,
        email: email,
        authProviders: ['google.com'],
      });

      // Receive the user profile
      if (userProfile) {
        // Send them to the onboarding flow to select their favorite genres
        navigation.replace('SelectGenresScreen'); 
      } else {
        // If the profile exists and onboarding is completed, we send them an alert to log in instead of registering again with Google
        Alert.alert("Este usuario ya existe, inicia sesión o ingresa otra cuenta");
      }
    } catch (error) {
      Alert.alert('Error, no se pudo iniciar sesión con Google');
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleEmailRegister = async () => {
    // The user must fill all the fields to proceed with registration
    console.log('Fecha actual en el estado:', date);
    if (!username || !email || !password || !confirmPassword || !date) {
      Alert.alert(
        'Error',
        'Por favor llena todos los campos antes de continuar.',
      );
      return;
    }
    // Validate that the password and confirm password fields match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    // Password must be at least 8 characters long for better security
    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    try {
      // Create the user with email and password using Firebase Authentication
      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (user) {
        // 
        await createUserProfileIfNeeded({
          uid: user.uid,
          username: username,
          email: email,
          birthDate: formattedDate,
          authProviders: ['password'],
          onBoardingCompleted: false, 
        });
        // This would be the first time the user logs in, so we send them to the onboarding flow to select their favorite genres
        navigation.replace('SelectGenresScreen');
      }
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-box') {
        Alert.alert('Error', 'Ese correo ya está registrado.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'El correo electrónico no es válido.');
      } else {
        Alert.alert('Error', 'Ocurrió un error al crear la cuenta.');
      }
    }
  };

  return (
    <View>
      <View style={[styles.heroContainer, { height: heroHeight }]}>
        <Image
          source={require('../img/portada.png')}
          style={styles.coverImage}
          resizeMode="cover"
        />

        <LinearGradient
          colors={[
            hexToRgba(colors.background, 0),
            hexToRgba(colors.background, 0.75),
            colors.background,
          ]}
          locations={[0, 0.55, 1]}
          style={styles.heroFade}
          pointerEvents="none"
        />
      </View>

      <View style={styles.generalInfo}>
        <GeneralTitle style={styles.title}>Ingresar</GeneralTitle>

        <View style={styles.inputText}>
          <View style={styles.iconContainer}>
            <GeneralIcon name="person-circle-outline" />
          </View>
          <TextInput
            style={[styles.input, { color: colors.mainText }]}
            placeholder="Nombre de usuario"
            placeholderTextColor={colors.secondaryText}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputTextCalendar}>
          <TextInput
            style={[styles.inputCalendar, { color: colors.mainText }]}
            value={formattedDate}
            placeholder="Fecha de nacimiento"
            placeholderTextColor={colors.secondaryText}
            editable={false}
          />

          <Pressable
            style={styles.iconButtonCalendar}
            onPress={() => setShow(true)}
          >
            <GeneralIcon name="calendar-outline" />
          </Pressable>
        </View>

        {show && Platform.OS === 'ios' && (
          <Modal
            visible={show}
            transparent
            animationType="fade"
            onRequestClose={() => setShow(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShow(false)}
            >
              <Pressable
                style={[
                  styles.datePickerContainer,
                  { backgroundColor: colors.background },
                ]}
                onPress={() => {}}
              >
                <DateTimePicker
                  value={date ?? new Date()}
                  mode="date"
                  display="spinner"
                  onValueChange={(_, selectedDate) => {
                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                />

                <Pressable
                  style={[
                    styles.dateConfirmButton,
                    { backgroundColor: colors.button },
                  ]}
                  onPress={() => setShow(false)}
                >
                  <ButtonText>Aceptar</ButtonText>
                </Pressable>
              </Pressable>
            </Pressable>
          </Modal>
        )}

        {show && Platform.OS === 'android' && (
          <DateTimePicker
            value={date ?? new Date()}
            mode="date"
            display="default"
            onValueChange={(_, selectedDate) => {
              setShow(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
            onDismiss={() => setShow(false)}
          />
        )}

        <View style={styles.inputText}>
          <View style={styles.iconContainer}>
            <GeneralIcon name="mail-outline" />
          </View>
          <TextInput
            style={[styles.input, { color: colors.mainText }]}
            placeholder="Email"
            placeholderTextColor={colors.secondaryText}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputText}>
          <View style={styles.iconContainer}>
            <GeneralIcon name="lock-open-outline" />
          </View>
          <TextInput
            style={[styles.input, { color: colors.mainText }]}
            placeholder="Contraseña"
            placeholderTextColor={colors.secondaryText}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <GeneralIcon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            />
          </Pressable>
        </View>

        <View style={styles.inputText}>
          <View style={styles.iconContainer}>
            <GeneralIcon name="lock-open-outline" />
          </View>
          <TextInput
            style={[styles.input, { color: colors.mainText }]}
            placeholder="Confirmar contraseña"
            placeholderTextColor={colors.secondaryText}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Pressable
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <GeneralIcon
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            />
          </Pressable>
        </View>

        <Pressable
          style={[styles.button, { backgroundColor: colors.button }]}
          onPress={handleEmailRegister} // <--- Añadimos la función aquí
        >
          <ButtonText>Crear cuenta</ButtonText>
        </Pressable>

        <View style={styles.container}>
          <View style={[styles.line, { backgroundColor: colors.mainText }]} />
          <GeneralText style={styles.text}>O</GeneralText>
          <View style={[styles.line, { backgroundColor: colors.mainText }]} />
        </View>

        <Pressable
          onPress={handleGoogleSignIn}
          style={({ pressed }) => [
            styles.googleButton,
            pressed && { opacity: 0.85 },
            { backgroundColor: colors.button },
          ]}
        >
          <View style={styles.content}>
            <GeneralIcon name="logo-google" />
            <ButtonText style={styles.text}>
              {loadingGoogle ? 'Cargando...' : 'Continuar con Google'}
            </ButtonText>
          </View>
        </Pressable>

        <View style={styles.infoLogin}>
          <GeneralText>Ya tienes una cuenta? </GeneralText>
          <Pressable onPress={() => setShowLogin(true)}>
            <ButtonText
              style={[styles.text, { color: colors.button }]}
              onPress={() => navigation.replace('LoginScreen')}
            >
              Iniciar sesión
            </ButtonText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  heroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 110,
  },
  generalInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  inputText: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'gray',
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 50,
    width: '85%',
    maxWidth: 350,
  },
  input: {
    flex: 9,
    paddingVertical: 0,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
  infoLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 1,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 100,
    width: '85%',
    maxWidth: 300,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '85%',
    maxWidth: 350,
  },
  line: {
    flex: 1,
    height: 1,
  },
  googleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    maxWidth: 320,
    height: 60,
    borderRadius: 999,
    backgroundColor: '#8FA2FF',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputTextCalendar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'gray',
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 50,
    width: '85%',
    maxWidth: 350,
  },
  inputCalendar: {
    flex: 1,
    paddingVertical: 0,
  },
  iconButtonCalendar: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  datePickerContainer: {
    width: '85%',
    maxWidth: 350,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  dateConfirmButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    alignItems: 'center',
  },
});
