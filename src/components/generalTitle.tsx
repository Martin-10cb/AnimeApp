import { StyleSheet, Text, TextProps, useWindowDimensions } from 'react-native';
import { useTheme } from '../theme/useTheme';


export default function GeneralTitle({ style, ...props }: TextProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions(); 

  const fontSize = width < 480 ? 32 : 49;

  return (
    <Text {...props} style={[styles.text, { color: theme.mainText, fontSize }, style]} />
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    }
})