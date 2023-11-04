import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';


const ListaMovimentacoes = () => {

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
        console.log(movimentacoes)
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large"/>;
  }

  return (

  <View style={styles.container}>


    <Text style={styles.title}>Últimas Movimentações</Text>

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
            {item.type === 1 ? `R$ ${item.value.toFixed(2)}` : `R$ -${item.value.toFixed(2)}`}
          </Text>

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
    borderColor: '#dadada',
  },
  linhaSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 8
  },
  date: {
    color: '#dadada',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tipoPgto: {
    color: '#dadada',
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
  }
})

export default ListaMovimentacoes