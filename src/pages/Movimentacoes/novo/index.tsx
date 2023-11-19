import React from 'react';
import { Alert } from 'react-native';
import { Center, Heading, VStack } from 'native-base';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../routes';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';


const schema = yup.object({
  label: yup
    .string()
    .min(10, "No mínimo 10 caracteres")
    .required("Informe a descrição da movimentação"),
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

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  })
  const navigation = useNavigation<StackTypes>();

  function handleCadastrar(data: FormDataProps) {
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
        Alert.alert("Cadastro de Movimentações", "Movimentação cadastrada com sucesso!")
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
            render={({ field: {onChange}}) => (
              <Input placeholder='Descrição da movimentação' />
            )}
          />

          <Input placeholder='Tipo da movimentação (0 = Compra / 1 = Venda)'/>
          <Input placeholder='Data da Movimentação' />
          <Input placeholder='Opção de pagamento' />
          <Input placeholder='Valor da movimentação' />

          <Button title='Salvar'/>

        </Center>
      </VStack>
    
    
  )
}