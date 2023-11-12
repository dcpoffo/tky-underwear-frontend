import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import { StackTypes } from '../../../routes';

import { FontAwesome5 } from '@expo/vector-icons';
import Cabecalho from '../../../components/header/header';

const ListaProdutos = () => {

  const navigation = useNavigation<StackTypes>();
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [qtdProdutos, setQtdPtodutos] = useState(0);

  useEffect(() => {
    const subscriber = firestore()
      .collection('produtos')
      .onSnapshot(querySnapshot => {
        const produtos: any[] = [];

        querySnapshot.forEach(documentSnapshot => {
          produtos.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
          setQtdPtodutos(querySnapshot.size)
        });

        setProdutos(produtos);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  function handleNovo() {
    navigation.navigate("NovoProduto");
  }

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <Cabecalho />
      <View style={styles.container}>

        <View style={styles.cabecalho}>

          <Text style={styles.title}>Produtos cadastrados: {qtdProdutos}</Text>
          <TouchableOpacity style={styles.button} onPress={handleNovo}>
            {/* <Text style={styles.buttonText}>Novo</Text> */}
            <FontAwesome5 name="plus" size={24} color="blue" />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          data={produtos}
          renderItem={({ item }) => <>

            <View style={styles.linhaSuperior}>
              <Text style={styles.titleList}>Descrição</Text>
              <Text style={styles.titleList}>Qtd.Mín.Estoque</Text>
            </View>
            <View style={styles.linhaSuperior}>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.descricao}>{item.qtd_minima}</Text>
            </View>

            <View style={styles.barra}>
              <Text style={styles.titleList}>Cód. Barra</Text>
              <Text>{item.barra}</Text>
            </View>
          </>} />
      </View></>
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
    height: 30,
    width: 30,
    // backgroundColor: '#B0060E',
    // borderRadius: 4,
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
  titleList: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#dadada'
  },
  list: {
    marginStart: 10,
    marginEnd: 10,
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

export default ListaProdutos;