import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Lista from './lista'

const ListProduts = () => (
  <View style={styles.container}>

    <Text style={styles.title}>Produtos cadastrados</Text>

    <Lista />

  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dadada'
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14,
  }
})

export default ListProduts