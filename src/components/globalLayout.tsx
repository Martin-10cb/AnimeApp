import React from "react"
import { StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {useTheme} from "../theme/useTheme"


export default function RootLayout({children}: {children: React.ReactNode}  ) {
  const theme = useTheme()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})