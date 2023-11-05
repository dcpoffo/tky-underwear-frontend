import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NovaMovimentacao = () => {
  return (
    <View style={styles.container}>
      <Text>NovaMovimentacao</Text>
    </View>
  )
}

export default NovaMovimentacao

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
})