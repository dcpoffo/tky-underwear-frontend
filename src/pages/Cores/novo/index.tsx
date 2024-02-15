/* eslint-disable */
import { View, Text } from 'react-native'
import React from 'react'
import { Center, Heading, VStack, useToast } from 'native-base'
import { Button } from '../../../components/Button'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useAPI } from '../../../service/API'
import { useNavigation } from '@react-navigation/native'
import { StackTypes } from '../../../routes'
import { Input } from '../../../components/Input'


const schema = yup.object({
  descricao: yup
    .string().min(3,"Descrição com no mínimo 3 caracteres")
    .required("Informe a descrição")
    .max(20, "No máximo 20 caracteres")
    
})

type FormDataProps = {
  descricao: string;
}

export default function NovaCor() {

  const toast = useToast();

  const { control, handleSubmit, formState: { errors}} = useForm<FormDataProps>({
    resolver: yupResolver(schema),
  })

  const api = useAPI();

  const navigation = useNavigation<StackTypes>();

  async function handleCadastrar(data: FormDataProps) {

    try {

      const response = await api.post("/cor", {
        descricao: data.descricao,
      })
      console.log(response.data);

      if (response.data) {

        toast.show({
          description:' Cor cadastrada com sucesso!',
          placement: 'top',
          bg: 'green.500',
          fontSize: 'md',
        })
        
      }
      
    } catch (erro) {
      console.log(`**** ${erro}`);


      toast.show({
        description: 'Erro ao cadastrar a cor!',
        placement: 'top',
        bg: 'red.500',
        fontSize: 'md'
      })
      
    }
    finally {
      navigation.goBack();
    }
  }

  return (
    <VStack flex={1} px={5}>
        <Center>
            <Heading/>

            <Controller
              control={control}
              name='descricao'
              render={({ field: {onChange}}) => (
                <Input
                  placeholder='Descrição da Cor'
                  onChangeText={onChange}
                  errorMessage={errors.descricao?.message}
                />
              )}
            />

            <Button
                title='Salvar' 
                onPress={handleSubmit(handleCadastrar)}               
            />
        </Center>
        
    </VStack>
  )
}