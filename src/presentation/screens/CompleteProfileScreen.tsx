import { Text } from "@react-navigation/elements";
import { View } from "react-native";
import { RootStackParams } from "../navigation/StackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface Props
  extends NativeStackScreenProps<RootStackParams, 'CompleteProfileScreen'> {}

export default function CompleteProfileScreen({ navigation }: Props) {
    return (
        <View>
            <Text>Complete Profile Screen</Text>
        </View>
    )
}