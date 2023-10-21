import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function Login() {

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isLoading, setIsLoading] = useState(false);

 const navigation = useNavigation();

 function handleLogin(){
  setIsLoading(true);

  auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);     
      navigation.navigate("Home");
    })
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false))
 }

 return (
   <View style={styles.container}>
     <Text style={styles.title}>Seja bem vindo(a)!</Text>

     <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Digite seu email"
     />

     <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Digite sua senha"
     />

     <TouchableOpacity style={styles.button} onPress={handleLogin}>
       <Text style={styles.buttonText}>Acessar</Text>
     </TouchableOpacity>    

     {isLoading  && <ActivityIndicator color={'#AAAAAA'}/> }

   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38C'
  },
  title:{
    marginBottom: 14,
    fontSize: 20,
  },
  input:{
    width: '90%',
    height: 45,
    backgroundColor: '#A7A7A7',
    borderRadius: 10,
    marginBottom: 14,
    padding: 8,
  },
  button:{
    width: '90%',
    height: 45,
    backgroundColor: '#B0060E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText:{
    fontSize: 20,
    color: '#FFF'
  }
})