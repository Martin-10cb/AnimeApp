import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/LoginScreen";
import MainScreen from "../screens/MainScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SelectGenresScreen from "../screens/SelectGenreScreen";
import CompleteProfileScreen from "../screens/CompleteProfileScreen";

export type RootStackParams = {
    StartScreen: undefined;
    LoginScreen: undefined;
    MainScreen: undefined;
    RegisterScreen: undefined;
    SelectGenresScreen: undefined;
    CompleteProfileScreen: undefined;
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
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="SelectGenresScreen" component={SelectGenresScreen} />
            <Stack.Screen name="CompleteProfileScreen" component={CompleteProfileScreen} />
        </Stack.Navigator>
    );
}