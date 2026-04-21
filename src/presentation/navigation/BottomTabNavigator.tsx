// Navigation/DrawerNavigation.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import GeneralIcon from '../../components/generalIcon';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FavoriteMangaScreen from '../screens/FavoriteMangaScreen';
import { useTheme } from '../../theme/useTheme';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type DrawerTabParams = {
  MainScreen: undefined;
  SearchScreen: undefined;
  FavoriteMangaScreen: undefined;
  SettingsScreen: undefined;
};

const Tab = createBottomTabNavigator<DrawerTabParams>();

const { width } = Dimensions.get('window');
const isTablet = width > 768;

export const DrawerNavigation = () => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const totalHeight = 40 + (isTablet ? 20 : insets.bottom);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false, 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.targets,
          height: totalHeight, 
          borderTopWidth: 0,
          paddingBottom: 0,
          justifyContent: 'center', 
          borderRadius: 100
        },
        tabBarIconStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <GeneralIcon name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <GeneralIcon name="search-sharp" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="FavoriteMangaScreen"
        component={FavoriteMangaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <GeneralIcon name="heart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <GeneralIcon name="person" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
