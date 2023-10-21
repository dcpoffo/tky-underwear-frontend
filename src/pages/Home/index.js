import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Header } from 'react-native/Libraries/NewAppScreen';


const Home = () => {

   function handleSignOut() {
      auth().signOut();
      navigation.navigate("Login");
   }

   const navigation = useNavigation();

   function handleListProdutos() {
      navigation.navigate("ListProduts");
   }

   function handleMovimentacoes() {
      navigation.navigate("Movimentacoes");
   }

   return (
      <>
         <View style={styles.header}>
            <Text>header</Text>
            <MaterialIcons.Button style={styles.buttonLogout} name="logout" onPress={handleSignOut} />
         </View>


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
      backgroundColor: '#38C'
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
      backgroundColor: '#B0060E',
      borderRadius: 10,
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