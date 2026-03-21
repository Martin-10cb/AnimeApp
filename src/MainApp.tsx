import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import globalLayout from './components/globalLayout';
import RootLayout from './components/globalLayout';
import HomeScreen from './screens/HomeScreen';
import StartScreen from './screens/StartScreen';

export const MainApp = () => {
  return (
    <SafeAreaProvider>
        <RootLayout>
          <StartScreen />
        </RootLayout>
    </SafeAreaProvider>
  );
};
