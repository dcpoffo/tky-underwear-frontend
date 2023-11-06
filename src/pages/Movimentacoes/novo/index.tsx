import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../routes';

const schema = yup.object({
  label: yup
    .string()
    .min(10,"No mínimo 10 caracteres")
    .required("Informe a descrição da movimentação"),
    type: yup
      .string()
      .required("Selecione o tipo da movimentação"),
})

const NovaMovimentacao = () => {

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const navigation = useNavigation<StackTypes>();
  const [isLoading, setIsLoading] = useState(false);

  function handleCadastrar(data: any) {
    setIsLoading(true);
  }


  return (
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
              }]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder='Descrição da movimentação'
          />
        )}
      />
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
              }]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder='Tipo da movimentação'
          />
        )}
      />
      {errors.type && <Text style={styles.labelError}>{errors.type?.message}</Text>}

      {/* 
      label: 'Compra de malha',
        type: 0, // 0 = despesa / 1 = receinta
        date: '01/09/2023',
        paymentType: 'Pix',
        value: '120,00'
       */}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(handleCadastrar)}>
        <Text style={styles.buttonText}>Salvar</Text>

      </TouchableOpacity>
    </View>
  )
}

export default NovaMovimentacao

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