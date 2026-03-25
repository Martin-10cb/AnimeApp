import React from "react"
import { StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export default function RootLayout({children}: {children: React.ReactNode}  ) {

  return (
    <SafeAreaView style={[styles.container]}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})