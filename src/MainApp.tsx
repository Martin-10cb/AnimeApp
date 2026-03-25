import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { useTheme } from './theme/useTheme';
import RootLayout from './components/globalLayout';

export const MainApp = () => {
  const { navigationTheme } = useTheme();

  return (
    <SafeAreaProvider>
      <RootLayout>
        <NavigationContainer theme={navigationTheme}>
          <StackNavigator />
        </NavigationContainer>
      </RootLayout>
    </SafeAreaProvider>
  );
};
