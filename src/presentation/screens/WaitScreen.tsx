import React from 'react';
import {
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { hexToRgba } from '../../helpers/utils/color';
import GeneralText from '../../components/generalText';
import GeneralTitle from '../../components/generalTitle';
import { useTheme } from '../../theme/useTheme';

export default function WaitScreen() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const { colors } = useTheme();

  const heroHeight = isTablet ? height * 0.6 : height * 0.5;
  const cardWidth = isTablet ? 456 : 352;

  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
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
        <GeneralTitle style={styles.title}>Preparando MangaKai</GeneralTitle>

        <GeneralText style={[styles.text, { width: cardWidth }]}>
          Estamos organizando tus géneros favoritos y las últimas tendencias en español latino para ti...
        </GeneralText>
        
        {/* Agregamos el spinner aquí para que el usuario sepa que está cargando */}
        <ActivityIndicator 
            size="large" 
            color={colors.button} 
            style={{ marginTop: 20 }} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
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
    gap: 20,
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
});