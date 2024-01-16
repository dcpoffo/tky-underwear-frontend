/* eslint-disable */
import React, { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Center, Heading, VStack, useToast } from 'native-base';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes';

const schema = yup.object({
  email: yup
    .string().default('dcpoffo@gmail.com')
    .email("E-mail inválido").required("Informe seu e-mail"),
  //patern    
  password: yup
    .string().default('password@gmail.com')
    .min(6, "A senha deve ter no mínimo 6 digitos")
    .required("Informe sua senha")
})

type FormDataProps = {
  email: string,
  password: string
}

export default function Login() {

  const toast = useToast();
  const navigation = useNavigation<StackTypes>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  })

  const [isLoading, setIsLoading] = useState(false);  

  function handleLogin(data: FormDataProps) {
    navigation.navigate("Home");
    toast.show({
      description: 'Entrou',
      placement: 'top',
      bg: 'green.500',
      fontSize: 'md'
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