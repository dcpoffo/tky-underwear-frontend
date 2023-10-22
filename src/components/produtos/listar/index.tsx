import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Lista from './lista'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

const ListProduts = () => {

  const navigation = useNavigation();
  const [produto, setProduto] = useState<any>('');
  
  function getData() {
    firestore()
      .collection('produtos')
      .get()
      .then((response) => {
        response.forEach(item => {
          console.log('ID: ', item.id, item.data());                
        })
      })   
  }
//PEGA DETERMINADA POSIÇÃO DA COLEÇÃO
  // firestore()
  //     .collection('produtos')
  //     .get()
  //     .then((itens) => {
  //       itens.docs[0].data();
  //       console.log(itens.docs[0].data())
  //     }) 

  useEffect(() => {
    getData() ;
  }, [])

  function handleNovo() {
    //navigation.navigate("Home");
  }

  return (

    <View style={styles.container}>

      <View style={styles.cabecalho}>
        <Text style={styles.title}>Produtos cadastrados</Text>
        <TouchableOpacity style={styles.button} onPress={handleNovo}>

          <Text style={styles.buttonText}>Novo</Text>
        </TouchableOpacity>
      </View>

      {/* <Lista/> */}
      <Text>Descrição: {produto.descricao}</Text>
      <Text>Cód. Barra: {produto.barra}</Text>
      <Text>Estoque mín.: {produto.qtd_minima}</Text>

      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={produto}
        renderItem={({ item }) => <>

          <View style={styles.linhaSuperior}>
            <Text style={styles.title}>Descrição</Text>
            <Text style={styles.title}>Qtd.Mín.Estoque</Text>
          </View>
          <View style={styles.linhaSuperior}>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text style={styles.descricao}>{item.qtd_minima}</Text>
          </View>

          <View style={styles.barra}>
            <Text style={styles.title}>Cód. Barra</Text>
            <Text>{item.barra}</Text>
          </View>
        </>}
      />
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
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
  linhaSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 8
  },
  barra: {
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 8,
    borderBottomWidth: 5,
    borderColor: '#dadada',
  },
  descricao: {
    // fontWeight: 'bold',
    fontSize: 16,
  }
})

export default ListProduts;