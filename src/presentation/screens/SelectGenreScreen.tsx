import { Text } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { RootStackParams } from "../navigation/StackNavigator";


interface Props
  extends NativeStackScreenProps<RootStackParams, 'SelectGenresScreen'> {}

export default function SelectGenresScreen({ navigation }: Props) {
    return (
        <View>
            <Text>Select Genres Screen</Text>
        </View>
    )
}