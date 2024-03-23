/* eslint-disable */
import { Box, Center, HStack, Radio, VStack, useToast, Text, WarningOutlineIcon } from 'native-base';
import React from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import { useNavigation } from '@react-navigation/native';

import { StackTypes } from '../../../routes';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { useAPI } from '../../../service/API';

const schema = yup.object({
  label: yup
    .string()
    .required("Informe a descrição da movimentação")
    .min(5, "No mínimo 5 caracteres"),
  type: yup
    .string()
    .oneOf([ '0', '1' ], "Selecione Entrada ou Saída")
    .required("Selecione a movimentação: Entrada / Saida"),
  valor: yup
    .number()
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
  valor: number,
  paymentType: string,
  date: string
}

export default function NovaMovimentacao() {

  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  })

  const navigation = useNavigation<StackTypes>();

  const api = useAPI();

  async function handleCadastrar(data: FormDataProps) {
    try {
      const response = await api.post("/movimentacao", {
        label: data.label,
        type: data.type,
        valor: data.valor,
        paymentType: data.paymentType,
        date: data.date
      })
      console.log(response.data);

      if (response.data) {
        toast.show({
          description: 'Movimentação cadastrada com sucesso!',
          placement: 'top',
          bg: 'green.500',
          fontSize: 'md'
        })
      }

    } catch (erro) {
      console.log(`**** ${erro}`);
      toast.show({
        description: 'Erro ao cadastrar movimentação!',
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

    <VStack flex={1} px={2}>
      <Center>
        <Controller
          control={control}
          name='type'
          render={({ field: { onChange } }) => (
            <Box
              alignItems={'center'}
              h={16}
              w={'full'}
              borderWidth={2}
              borderColor={errors.type ? 'red.500' : 'gray.900'}
              borderRadius={10}
              justifyContent={'center'}
            >
              <Radio.Group
                defaultValue="-1"
                onChange={onChange}
                name="radioGroupTipo"
              >
                <HStack space={'1/4'}>
                  <Radio value="0" my={1} >
                    Entrada
                  </Radio>
                  <Radio value="1" my={1}>
                    Saida
                  </Radio>
                </HStack>
              </Radio.Group>
            </Box>
          )}
        />
        {errors.type && (
          <HStack mt={1} alignItems="center"           
          mr={'1/5'}
          >
            <WarningOutlineIcon size="xs" color="red.500"/>
            <Text
              fontSize={12}
              color="red.500"
              textAlign="right"
              ml={1}              
              //mr={12}
            >
              {errors.type.message}
            </Text>
          </HStack>
        )}


        <Controller
          control={control}
          name='label'
          render={({ field: { onChange } }) => (
            <Input
              marginTop={4}
              placeholder='Descrição da movimentação'
              onChangeText={onChange}
              errorMessage={errors.label?.message}
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