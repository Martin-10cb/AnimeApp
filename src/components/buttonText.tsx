import { StyleSheet, Text, TextProps, useWindowDimensions } from 'react-native';
import { useTheme } from '../theme/useTheme';


export default function ButtonText({ style, ...props }: TextProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions(); 

  const fontSize = width < 480 ? 16 : 20;

  return (
    <Text {...props} style={[styles.text, { color: theme.mainText, fontSize }, style]} />
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: "#6B7280"
    }
})