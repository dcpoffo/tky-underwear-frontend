import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { StackTypes } from '../../routes';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Center, Heading, VStack, useToast } from 'native-base';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Toast } from '../../components/Toast';

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

type FormDataProps = {
  email: string,
  password: string
}

export default function Login() {

  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  })

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<StackTypes>();

  function handleLogin(data: FormDataProps) {
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        // auth().currentUser?.updateProfile({
        //   displayName: "Darlan R. C. Poffo"
        // })        
        console.log(result);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error)
        //Alert.alert('Login inválido', 'Algo deu errado! Verifique o Usuário e a Senha')
        toast.show({
          description: 'Algo deu errado! Verifique o Usuário e a Senha',
          placement: 'top',
          bg: 'red.500',
          fontSize: 'md'
        })
        

      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (

    <VStack flex={1} px={5}>
      <Center>

        <Heading my={24}>
          Seja bem vindo(a)
        </Heading>

        <Controller
          control={control}
          name='email'
          render={({ field: { onChange } }) => (
            <Input
              placeholder='Digite o seu E-mail'
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field: { onChange }}) => (
            <Input
            placeholder='Digite a sua senha'
            secureTextEntry={true}
            onChangeText={onChange}
            errorMessage={errors.password?.message}
            />
          )}
        />

        <Button
          title='Acessar'
          onPress={handleSubmit(handleLogin)}
        />

      </Center>
    </VStack>
  );
}