import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/LoginScreen";

export type RootStackParams = {
    StartScreen: undefined;
    LoginScreen: undefined;
}

const Stack = createNativeStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="StartScreen" component={StartScreen} />
        </Stack.Navigator>
    );
}