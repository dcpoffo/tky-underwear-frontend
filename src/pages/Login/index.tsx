import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { StackTypes } from '../../routes';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .email("E-mail inválido").required("Informe seu e-mail"),
    //patern    
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 digitos")
    .required("Informe sua senha")
})

export default function Login() {

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<StackTypes>();

  function handleLogin(data: any) {
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        console.log(result);
        navigation.navigate("Home");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem vindo(a)!</Text>

      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input, {
                borderWidth: errors.email && 1,
                borderColor: errors.email && '#B0060E'
              }]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Digite seu e-mail"
          />
        )}
      />
      {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
          style={[
            styles.input, {
              borderWidth: errors.password && 1,
              borderColor: errors.password && '#B0060E'
            }]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Digite sua senha"
            secureTextEntry={true}
          />
        )}
      />
      {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}


      <TouchableOpacity style={styles.button} onPress={handleSubmit(handleLogin)}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38C'
  },
  title: {
    marginBottom: 14,
    fontSize: 20,
  },
  input: {
    width: '95%',
    height: 45,
    backgroundColor: '#A7A7A7',
    borderRadius: 10,
    padding: 8,
    fontSize: 18,
    marginTop: 10,
  },
  button: {
    width: '90%',
    height: 45,
    backgroundColor: '#B0060E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF'
  },
  labelError: {
    alignSelf: 'flex-start',
    color: '#B0060E',
    marginBottom: 15,
    marginTop: 2,
    marginLeft: 20,
    fontSize: 15,
  }
})