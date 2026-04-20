import React from 'react';
import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerTabParams } from '../navigation/bottomTabNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';


interface Props extends NativeStackScreenProps<DrawerTabParams, 'SearchScreen'> {}

export default function SearchScreen({ navigation }: Props) {
  return (
    // En SearchScreen.tsx
    <SafeAreaView style={{ flex: 1,}}>
      <Text>
        SearchScreen
      </Text>
    </SafeAreaView>
  );
}
