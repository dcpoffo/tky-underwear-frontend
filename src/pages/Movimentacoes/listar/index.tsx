import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native'
import { StackTypes } from '../../../routes';

import { FontAwesome5 } from '@expo/vector-icons';
import Cabecalho from '../../../components/header/header';

const ListaMovimentacoes = () => {

  const navigation = useNavigation<StackTypes>();

  const [loading, setLoading] = useState(true);
  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('movimentacoes')
      .onSnapshot(querySnapshot => {
        const movimentacoes: any[] = [];

        querySnapshot.forEach(documentSnapshot => {
          movimentacoes.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });

        });
        setMovimentacoes(movimentacoes);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  function handleNovo() {
    navigation.navigate("NovaMovimentacao");
  }

  return (
    <>
      <Cabecalho />
      <View style={styles.container}>


        <View style={styles.cabecalho}>
          <Text style={styles.title}>Últimas movimentações</Text>
          <TouchableOpacity style={styles.button} onPress={handleNovo}>
            {/* <Text style={styles.buttonText}>Novo</Text> */}
            <FontAwesome5 name="plus" size={24} color="blue" />
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          data={movimentacoes}
          renderItem={({ item }) => <>

            <View style={styles.linhaSuperior}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.tipoPgto}>{item.paymentType}</Text>
            </View>

            <View style={styles.content}>

              <Text style={styles.label}>{item.label}</Text>

              <Text style={item.type === 1 ? styles.value : styles.expenses}>
                {item.type === 1 ? `R$ ${item.value}` : `R$ -${item.value}`}
              </Text>

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
    borderBottomColor: '#2f59f5'
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14,
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#2f59f5',
  },
  linhaSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 8
  },
  date: {
    color: '#2f59f5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tipoPgto: {
    color: '#2f59f5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  expenses: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    borderBottomWidth: 2,
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
})

export default ListaMovimentacoes