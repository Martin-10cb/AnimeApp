import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerTabParams } from '../navigation/bottomTabNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Manga } from '../../manga/mangaInterface';
import { mangaService } from '../../manga/mangaService';
import WaitScreen from './WaitScreen';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { hexToRgba } from '../../helpers/utils/color';
import GeneralText from '../../components/generalText';
import ButtonText from '../../components/buttonText';
import GeneralIcon from '../../components/generalIcon';
import { getAuth } from '@react-native-firebase/auth';
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';

interface Props extends NativeStackScreenProps<DrawerTabParams, 'MainScreen'> {}

const { width } = Dimensions.get('window');
const isTablet = width > 768;

export default function MainScreen({ navigation }: Props) {
  const [popularManga, setPopularManga] = useState<Manga[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();
  const heightCarrusel = isTablet ? 480 : 350;
  const buttonWdith = isTablet ? 300 : 200;

  const coverWidth = isTablet ? 150 : 110;
  const coverHeight = isTablet ? 190 : 140;

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const popular = await mangaService.getTopPopular();
      setPopularManga(popular);

      const auth = getAuth();
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser?.uid!));

      const favoriteGenres = userDoc.exists()
        ? userDoc.data()?.favoriteGenres
        : ['Accion', 'Romance', 'Comedia'];
      const sectionPromises = favoriteGenres.map(async (genreName: string) => {
        const data = await mangaService.getMangasByGenre(genreName);
        return {
          title: genreName.charAt(0).toUpperCase() + genreName.slice(1),
          data,
        };
      });
      const resolvedSections = await Promise.all(sectionPromises);
      setSections(
        resolvedSections.filter(s => s !== null && s.data.length > 0),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <WaitScreen />;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Contenedor del Carrusel */}
        <View style={{ height: heightCarrusel }}>
          <FlatList
            data={popularManga}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => `top-${item.id}`}
            renderItem={({ item }) => (
              <View style={[styles.bannerWrapper, { height: heightCarrusel }]}>
                <Image
                  source={{ uri: item.cover }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={[
                    hexToRgba(colors.background, 0.6),
                    hexToRgba(colors.background, 0.99),
                    colors.background,
                  ]}
                  locations={[0, 0.4, 1]}
                  style={styles.textContainer}
                >
                  <View style={{ paddingHorizontal: 20 }}>
                    <GeneralText style={[styles.description]} numberOfLines={3}>
                      {item.description ||
                        'No hay una descripción disponible actualmente'}
                    </GeneralText>
                    <View style={styles.containerButtons}>
                      <Pressable
                        style={{
                          backgroundColor: colors.primary,
                          width: buttonWdith,
                          ...styles.buttonToRead,
                        }}
                      >
                        <ButtonText>Comenzar a leer</ButtonText>
                      </Pressable>
                      <Pressable
                        style={{ marginLeft: 20 }}
                        onPress={() => console.log('Favorito:', item.id)}
                      >
                        <GeneralIcon name="heart" color={colors.primary} />
                      </Pressable>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            )}
          />
        </View>
        {sections.map((section, index) => (
          <View key={index}>
            <View style={styles.containerGenres}>
              <GeneralText>{section.title}</GeneralText>
            </View>
            <FlatList
              horizontal
              data={section.data}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              style={{ paddingLeft: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <Image
                    source={{ uri: item.cover }}
                    style={{
                      width: coverWidth,
                      height: coverHeight,
                      paddingRight: 10,
                      borderRadius: 10,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  bannerWrapper: {
    width: width,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 130,
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  containerGenres: {
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  buttonToRead: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 30,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    padding: 5,
  },
});
