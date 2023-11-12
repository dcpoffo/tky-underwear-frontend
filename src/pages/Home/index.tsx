import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes';
import Cabecalho from '../../components/header/header';

const Home = () => {

   const navigation = useNavigation<StackTypes>();   


   function handleListProdutos() {
      navigation.navigate("ListaProdutos");
   }

   function handleMovimentacoes() {
      navigation.navigate("Movimentacoes");
   }

   return (
      <>
         <Cabecalho/>

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
      </>
   )
}

const styles = StyleSheet.create({
   header: {
      backgroundColor: '#e6e8ed',
      height: '10%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10
   },
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2f59f5'
   },
   content: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f0f0'
   },
   title: {
      fontWeight: 'bold',
      fontSize: 20,
   },
   button: {
      height: 50,
      width: '70%',
      backgroundColor: '#2f59f5',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
   },
   buttonHeader: {
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
   },
   buttonText: {
      fontSize: 20,
      color: '#FFF'
   },
   buttonLogout: {
      size: 24,
      backgroundColor: "#B0060E",
      color: "#FFF"
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