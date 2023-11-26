import React from 'react';
import { Center, Heading, VStack, useToast } from 'native-base';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { StackTypes } from '../../../routes';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  label: yup
    .string()
    .required("Informe a descrição da movimentação")
    .min(5, "No mínimo 5 caracteres"),
  type: yup
    .string()
    .required("Informe o tipo da movimentação: 0 = Compra / 1 = Venda"),
  valor: yup
    .string()
    .required('Informe o Valor'),
  paymentType: yup
    .string()
    .required('Informe a opção de pagamento'),
  date: yup
    .string()
    .required('Informe a data')
})

type FormDataProps = {
  label: string,
  type: string,
  valor: string,
  paymentType: string,
  date: string
}

export default function NovaMovimentacao() {

  const toast = useToast();

  const { control, handleSubmit, formState: { errors }  } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  })
  const navigation = useNavigation<StackTypes>();

  function handleCadastrar(data: FormDataProps) {
    console.log(data)
    firestore()
      .collection('movimentacoes')
      .add({
        label: data.label,
        type: data.type,
        date: data.date,
        paymentType: data.paymentType,
        value: data.valor.replace(",", "."),
      })
      .then(() => {
        //Alert.alert("Cadastro de Movimentações", "Movimentação cadastrada com sucesso!")
        toast.show({
          description: 'Movimentação cadastrada com sucesso!',
          placement: 'top',
          bg: 'green.500',
          fontSize: 'md'
        })
        console.log(data)
      })
      .catch((erro) => {
        console.log(`**** ${erro}`);
      })
      .finally(() => {
        navigation.goBack();
      })
  }

  return (

    <VStack flex={1} px={5}>
      <Center>
        <Heading />

        <Controller
          control={control}
          name='label'          
          render={({ field: { onChange } }) => (
            <Input
              placeholder='Descrição da movimentação'
              onChangeText={onChange}
              errorMessage={errors.label?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='type'
          render={({ field: { onChange } }) => (
            <Input
              placeholder='Tipo da movimentação (0 = Compra / 1 = Venda)'
              onChangeText={onChange}
              errorMessage={errors.type?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='date'
          render={({ field: { onChange } }) => (
            <Input
              placeholder='Data da Movimentação'
              onChangeText={onChange}
              errorMessage={errors.date?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='paymentType'
          render={({ field: { onChange } }) => (
            <Input
              placeholder='Opção de pagamento'
              onChangeText={onChange}
              errorMessage={errors.paymentType?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='valor'
          render={({ field: { onChange } }) => (
            <Input
              placeholder='Valor da movimentação'
              onChangeText={onChange}
              errorMessage={errors.valor?.message}
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