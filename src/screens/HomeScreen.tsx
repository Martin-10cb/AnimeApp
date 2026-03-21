import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GeneralText from '../components/generalText';

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  const heroHeight = isTablet ? height * 0.45 : height * 0.38;

  return (
    <View style={styles.container}>
      <View style={[styles.heroContainer, { height: heroHeight }]}>
        <Image
          source={require('../img/portada.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <LinearGradient
          colors={['rgba(247,247,250,0)', 'rgba(247,247,250,0.75)', '#F7F7FA']}
          locations={[0, 0.55, 1]}
          style={styles.heroFade}
          pointerEvents="none"
        />
      </View>

      <View style={[styles.content, isTablet && styles.contentTablet]}>
        <GeneralText style={[styles.title, isTablet && styles.titleTablet]}>
          Bienvenido a MangaKai
        </GeneralText>

        <GeneralText
          style={[styles.description, isTablet && styles.descriptionTablet]}
        >
          Sumérgete en un mundo lleno de historias, da tu opinión, crea rachas
          con amigos y comparte tus propias historias
        </GeneralText>

        <Pressable style={[styles.button, isTablet && styles.buttonTablet]}>
          <GeneralText style={styles.buttonText}>Comenzar</GeneralText>
        </Pressable>

        <View style={styles.loginRow}>
          <GeneralText style={styles.loginText}>
            Ya tienes una cuenta?{' '}
          </GeneralText>
          <GeneralText style={styles.loginLink}>Iniciar Sesión</GeneralText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FA',
  },
  heroContainer: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    alignItems: 'center',
  },
  contentTablet: {
    maxWidth: 640,
    alignSelf: 'center',
    width: '100%',
    paddingTop: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },
  titleTablet: {
    fontSize: 42,
  },
  description: {
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 28,
    maxWidth: 420,
  },
  descriptionTablet: {
    maxWidth: 520,
    lineHeight: 30,
  },
  button: {
    width: '100%',
    maxWidth: 280,
    backgroundColor: '#A8AEFF',
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonTablet: {
    maxWidth: 340,
  },
  buttonText: {
    color: '#1D1D1F',
    fontWeight: '700',
  },
  loginRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    color: '#8F95FF',
    fontWeight: '700',
  },
});