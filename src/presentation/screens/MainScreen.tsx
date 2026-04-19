import { Text } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { RootStackParams } from "../navigation/StackNavigator";


interface Props
  extends NativeStackScreenProps<RootStackParams, 'MainScreen'> {}

export default function MainScreen({ navigation }: Props) {
    return (
        <View>
            <Text>Main Screen</Text>
        </View>
    )
}