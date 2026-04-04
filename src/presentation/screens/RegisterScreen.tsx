import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { signInWithGoogle } from '../../auth/googleAuth';
import { hexToRgba } from '../../helpers/utils/color';
import GeneralTitle from '../../components/generalTitle';
import ButtonText from '../../components/buttonText';
import { useTheme } from '../../theme/useTheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigation/StackNavigator';
import GeneralIcon from '../../components/generalIcon';
import GeneralText from '../../components/generalText';

interface Props
  extends NativeStackScreenProps<RootStackParams, 'RegisterScreen'> {}

export default function RegisterScreen({ navigation }: Props) {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const { colors, isDark } = useTheme();

  const heroHeight = isTablet ? height * 0.5 : height * 0.3;

  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoadingGoogle(true);
      const userCredential = await signInWithGoogle();
      navigation.replace('MainScreen');
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.message ?? 'No se pudo iniciar sesión con Google',
      );
    } finally {
      setLoadingGoogle(false);
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
            <GeneralIcon name="mail-outline" />
          </View>
          <TextInput
            style={[styles.input, { color: colors.mainText }]}
            placeholder="Nombre de usuario"
            placeholderTextColor={colors.secondaryText}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
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
          <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <GeneralIcon
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            />
          </Pressable>
        </View>
    
        <Pressable style={[styles.button, { backgroundColor: colors.button }]}>
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
            <ButtonText style={[styles.text, { color: colors.button }]} onPress={() =>navigation.replace('LoginScreen') } >
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
});
