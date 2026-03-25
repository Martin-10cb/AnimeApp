import { useColorScheme } from "react-native";
import {
  darkThemeColors,
  lightThemeColors,
  darkNavigationTheme,
  lightNavigationTheme,
} from "./theme";

export const useTheme = () => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return {
    isDark,
    colors: isDark ? darkThemeColors : lightThemeColors,
    navigationTheme: isDark ? darkNavigationTheme : lightNavigationTheme,
  };
};