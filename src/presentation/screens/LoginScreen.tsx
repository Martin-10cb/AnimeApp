import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import { hexToRgba } from '../../helpers/utils/color';
import GeneralText from '../../components/generalText';
import ButtonText from '../../components/buttonText';
import GeneralTitle from '../../components/generalTitle';
import { useTheme } from '../../theme/useTheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigation/StackNavigator';

interface Props extends NativeStackScreenProps<RootStackParams, 'LoginScreen'> {}

export default function LoginScreen() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const { colors, isDark } = useTheme();

  const heroHeight = isTablet ? height * 0.6 : height * 0.4;
  const buttonWidth = isTablet ? '40%' : '65%';

  const [showLogin, setShowLogin] = useState(false);


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

      <View style={[styles.generalInfo]}>
        <GeneralTitle style={styles.title}>Ingresar</GeneralTitle>
        <TextInput style={{borderColor: "white", borderWidth: 1, paddingVertical: 10, borderRadius: 10, width: buttonWidth}} placeholder="Email"></TextInput>
        <TextInput style={{borderColor: "white", borderWidth: 1, paddingHorizontal: 120, paddingVertical: 10, borderRadius: 10}} placeholder="Contraseña"></TextInput>
        <Pressable style={[styles.button, { backgroundColor: colors.button }]}>
          <ButtonText style={styles.text}>Comenzar</ButtonText>
        </Pressable>
      </View>
      <View style={styles.infoLogin}>
        <GeneralText>Ya tienes una cuenta? </GeneralText>
        <Pressable >
          <ButtonText style={[styles.text,{color: colors.button}]}>Iniciar sesión</ButtonText>
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
    marginTop:20,
  },
});
