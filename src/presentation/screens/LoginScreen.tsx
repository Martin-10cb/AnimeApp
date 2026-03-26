import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { signInWithGoogle } from '../../auth/googleAuth';
import { hexToRgba } from '../../helpers/utils/color';
import GeneralText from '../../components/generalText';
import GeneralTitle from '../../components/generalTitle';
import ButtonText from '../../components/buttonText';
import { useTheme } from '../../theme/useTheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigation/StackNavigator';
 // ajusta ruta si no usas src

interface Props extends NativeStackScreenProps<RootStackParams, 'LoginScreen'> {}

export default function LoginScreen({navigation}: Props) {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const { colors, isDark } = useTheme();

  const heroHeight = isTablet ? height * 0.6 : height * 0.5;
  const cardWidth = isTablet ? 456 : 352;

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoadingGoogle(true);

      const userCredential = await signInWithGoogle();

      Alert.alert(
        'Sesión iniciada',
        `Bienvenido${userCredential.user.displayName ? `, ${userCredential.user.displayName}` : ''}`
      );

      // Aquí después puedes navegar a Home
      // navigation.navigate('Home');
    } catch (error: any) {
      Alert.alert('Error', error?.message ?? 'No se pudo iniciar sesión con Google');
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
        <GeneralTitle style={styles.title}>Bienvenido a MangaKai</GeneralTitle>

        <GeneralText style={[styles.text, { width: cardWidth }]}>
          Sumérgete en un mundo lleno de historias, da tu opinión, crea rachas
          con amigos y comparte tus propias historias
        </GeneralText>

        <Pressable
          style={[styles.button, { backgroundColor: colors.button }]}
          onPress={handleGoogleSignIn}
          disabled={loadingGoogle}
        >
          <ButtonText style={styles.text}>
            {loadingGoogle ? 'Conectando...' : 'Continuar con Google'}
          </ButtonText>
        </Pressable>
      </View>

      <View style={styles.infoLogin}>
        <GeneralText>Ya tienes una cuenta? </GeneralText>
        <Pressable onPress={() => setShowLogin(true)}>
          <ButtonText style={[styles.text, { color: colors.button }]}>
            Iniciar sesión
          </ButtonText>
        </Pressable>
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
    gap: 30,
  },
  text: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 100,
  },
  infoLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 1,
    marginTop: 20,
  },
});