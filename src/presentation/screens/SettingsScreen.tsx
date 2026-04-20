import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerTabParams } from '../navigation/bottomTabNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';


interface Props extends NativeStackScreenProps<DrawerTabParams, 'SettingsScreen'> {}

export default function SettingsScreen({ navigation }: Props) {
  return (
    // En SettingsScreen.tsx
    <SafeAreaView style={{ flex: 1,}}>
      <Text>
        SettingsScreen
      </Text>
    </SafeAreaView>
  );
}
