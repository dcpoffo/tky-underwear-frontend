import { useNavigation } from '@react-navigation/native';
import { Center, VStack } from 'native-base';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Cabecalho from '../../components/header/header';
import { StackTypes } from '../../routes';

import { Button } from '../../components/Button';

export default function Home() {

   const navigation = useNavigation<StackTypes>();  

   function handleListProdutos() {
      navigation.navigate("ListaProdutos");
   }

   function handleMovimentacoes() {
      navigation.navigate("Movimentacoes");
   }

   // function handlePerfil() {
   //    navigation.navigate("Perfil");
   // }   

   function handleSignOut() {        
      auth().signOut().then(() => {
         navigation.navigate("Login");
      });
  }

   return (
      <>
         {/* <Cabecalho/> */}
         <VStack 
            flex={1} 
            px={10}            
            justifyContent= {'center'}            
            >
            <Center>               

               <Button
                  title='Movimentações'
                  onPress={handleMovimentacoes}
                  marginBottom={5}
               />
               <Button
                  title='Produtos'
                  onPress={handleListProdutos}
                  marginBottom={5}
               />
               {/* <Button
                  title='Alterar nome'
                  onPress={handlePerfil}
                  marginBottom={5}
               /> */}
               <Button
                  title='Sair'
                  onPress={handleSignOut}
                  marginBottom={5}
               />
                 
            </Center>
         </VStack>
         
      </>
   )
}

// const styles = StyleSheet.create({
//    header: {
//       backgroundColor: '#e6e8ed',
//       height: '10%',
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: 10
//    },
//    container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: '#2f59f5'
//    },
//    content: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       width: '100%',
//       height: '100%',
//       backgroundColor: '#f0f0f0'
//    },
//    title: {
//       fontWeight: 'bold',
//       fontSize: 20,
//    },
//    button: {
//       height: 50,
//       width: '70%',
//       backgroundColor: '#2f59f5',
//       borderRadius: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//       margin: 10,
//    },
//    buttonHeader: {
//       height: 30,
//       width: 30,
//       justifyContent: 'center',
//       alignItems: 'center',
//       margin: 10,
//    },
//    buttonText: {
//       fontSize: 20,
//       color: '#FFF'
//    },
//    buttonLogout: {
//       size: 24,
//       backgroundColor: "#B0060E",
//       color: "#FFF"
//    },
//    buttonContent: {
//       height: '30%',
//       width: '70%',
//       justifyContent: "flex-start",
//       alignItems: 'center',
//       flexDirection: "column"
//    }
// })