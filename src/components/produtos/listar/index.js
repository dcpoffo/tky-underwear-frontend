import { StyleSheet, Text, View, TouchableOpacity, Button, Alert } from 'react-native'
import React from 'react'
import Lista from './lista'
import { useNavigation } from '@react-navigation/native'

const ListProduts = () => {

  const navigation = useNavigation();

  function handleNovo() {
    navigation.navigate('NovoProduto');
  }

  return (

    <View style={styles.container}>

      <View style={styles.cabecalho}>
        <Text style={styles.title}>Produtos cadastrados</Text>
        <TouchableOpacity style={styles.button} onPress={handleNovo}>

          <Text style={styles.buttonText}>Novo</Text>
        </TouchableOpacity>
      </View>

      <Lista />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dadada'
  },
  button: {
    height: 40,
    width: 80,
    backgroundColor: '#B0060E',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#dadada'
  }
})

export default ListProduts