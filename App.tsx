import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App(): JSX.Element {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Alhamdulillah</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'red',
  },
  text: {
    fontSize: 40,
  }
})