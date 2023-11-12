import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import firestore from '@react-native-firebase/firestore';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../routes';
import Cabecalho from '../../../components/header/header';

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

export default function NovaMovimentacao() {

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const navigation = useNavigation<StackTypes>();
  const [isLoading, setIsLoading] = useState(false);

  function handleCadastrar(data: any) {
    setIsLoading(true);
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
        setIsLoading(false);
        navigation.goBack();
      })
  }
  
  return (
    <>
      <Cabecalho />
      <View style={styles.container}>
        <Controller
          control={control}
          name='label'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input, {
                  borderWidth: errors.label && 1,
                  borderColor: errors.label && '#B0060E'
                }
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder='Descrição da movimentação' />
          )} />
        {errors.label && <Text style={styles.labelError}>{errors.label?.message}</Text>}

        <Controller
          control={control}
          name='type'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input, {
                  borderWidth: errors.label && 1,
                  borderColor: errors.label && '#B0060E'
                }
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="decimal-pad"
              placeholder='Tipo da movimentação (0 = Compra / 1 = Venda)' />
          )} />
        {errors.type && <Text style={styles.labelError}>{errors.type?.message}</Text>}        

        <Controller
          control={control}
          name='date'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input, {
                  borderWidth: errors.label && 1,
                  borderColor: errors.label && '#B0060E'
                }
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder='Data da Movimentação' />
          )} />
        {errors.date && <Text style={styles.labelError}>{errors.date?.message}</Text>}

        <Controller
          control={control}
          name='paymentType'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input, {
                  borderWidth: errors.label && 1,
                  borderColor: errors.label && '#B0060E'
                }
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder='Opção de pagamento' />
          )} />
        {errors.paymentType && <Text style={styles.labelError}>{errors.paymentType?.message}</Text>}

        <Controller
          control={control}
          name='valor'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input, {
                  borderWidth: errors.label && 1,
                  borderColor: errors.label && '#B0060E'
                }
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="decimal-pad"
              placeholder='Valor da movimentação' />
          )} />
        {errors.valor && <Text style={styles.labelError}>{errors.valor?.message}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(handleCadastrar)}>
          <Text style={styles.buttonText}>Salvar</Text>

        </TouchableOpacity>
      </View></>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    width: '95%',
    height: 45,
    backgroundColor: '#B0060E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF'
  },
  input: {
    width: '95%',
    height: 45,
    backgroundColor: '#A7A7A7',
    borderRadius: 10,
    marginBottom: 5,
    padding: 8,
  },
  labelError: {
    alignSelf: 'flex-start',
    color: '#B0060E',
    marginBottom: 15,
    // marginTop: 2,
    marginLeft: 10,
    fontSize: 15,
  }
})