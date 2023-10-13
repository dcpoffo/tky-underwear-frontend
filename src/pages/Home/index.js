import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';

const Home = () => {

   const navigation = useNavigation();

   function handleListProdutos() {
      navigation.navigate("ListProduts");
   }

   function handleMovimentacoes() {
      navigation.navigate("Movimentacoes");
   }

   return (
      <View style={styles.container}>
         <View style={styles.content}>
            <View style={styles.buttonContent}>

               <TouchableOpacity style={styles.button}
                  onPress={handleMovimentacoes}>
                  <Text style={styles.buttonText}>Movimentações</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.button}
                  onPress={handleListProdutos}>
                  <Text style={styles.buttonText}>Produtos</Text>

               </TouchableOpacity>

            </View>

         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   content: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '95%',
      height: '95%',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
   },
   title: {
      fontWeight: 'bold',
      fontSize: 20,
   },
   button: {
      height: 50,
      width: '70%',
      backgroundColor: '#B0060E',
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
   },
   buttonText: {
      fontSize: 20,
      color: '#FFF'
   },
   buttonContent: {
      height: '30%',
      width: '70%',
      justifyContent: "flex-start",
      alignItems: 'center',
      flexDirection: "column"
   }
})

export default Home