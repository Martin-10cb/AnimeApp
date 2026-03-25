import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

// 🎨 Tus colores (los de siempre)
export const lightThemeColors = {
  background: "#F7F7FB",
  targets: "#F2EBEB",
  button: "#A8B8FF",
  secondaryColor: "#BEE3F8",
  acent: "#F6C6EA",
  mainText: "#1F2937",
  secondaryText: "#6B7280",
};

export const darkThemeColors = {
  background: "#0F1115",
  targets: "#444956",
  button: "#8FA2FF",
  secondaryColor: "#7DD3FC",
  acent: "#F9A8D4",
  mainText: "#E5E7EB",
  secondaryText: "#9CA3AF",
};

// 🧠 Theme para React Navigation (EXTENDIENDO)
export const lightNavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: lightThemeColors.button,
    background: lightThemeColors.background,
    card: lightThemeColors.targets,
    text: lightThemeColors.mainText,
    border: lightThemeColors.secondaryText,
    notification: lightThemeColors.acent,
  },
};

export const darkNavigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: darkThemeColors.button,
    background: darkThemeColors.background,
    card: darkThemeColors.targets,
    text: darkThemeColors.mainText,
    border: darkThemeColors.secondaryText,
    notification: darkThemeColors.acent,
  },
};