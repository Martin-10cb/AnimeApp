import { StyleSheet, Text, TextProps, useWindowDimensions } from 'react-native';
import { useTheme } from '../theme/useTheme';


export default function GeneralText({ style, ...props }: TextProps) {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions(); 

  const fontSize = width < 480 ? 16 : 20;

  return (
    <Text {...props} style={[styles.text, { color: colors.secondaryText, fontSize }, style]} />
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    }
})