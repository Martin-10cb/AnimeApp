import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerTabParams } from '../navigation/bottomTabNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';


interface Props extends NativeStackScreenProps<DrawerTabParams, 'FavoriteMangaScreen'> {}

export default function FavoriteMangaScreen({ navigation }: Props) {
  return (
    // En FavoriteMangaScreen.tsx
    <SafeAreaView style={{ flex: 1,}}>
      <Text>
        FavoriteMangaScreen
      </Text>
    </SafeAreaView>
  );
}
