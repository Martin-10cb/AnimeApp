import React from "react"
import { StyleSheet, Text, View } from "react-native"



export default function RootLayout({children}: {children: React.ReactNode}  ) {

  return (
    <View style={[styles.container]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})