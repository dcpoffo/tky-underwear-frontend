import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Home = () => {

   function handleSignIn(){
      auth()
         .signInWithEmailAndPassword('dcpoffo@gmail.com','123456')
         .then(result => console.log(result))
         .catch(error => console.log(error))
   }

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

               <Button
                  title='Testar Firebase'
                  onPress={handleSignIn}
               />

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