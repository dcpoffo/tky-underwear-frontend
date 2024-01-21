/* eslint-disable */
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../routes';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";

import { Center, Heading, VStack, useToast } from 'native-base';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { useAPI } from '../../../service/API';

const schema = yup.object({
    descricao: yup
        .string().min(5, "Descrição com no mínimo 5 caracteres")
        .required("Informe a descrição"),
    qtdMinima: yup
        .number().default(0),
    barra: yup
        .string().default('0'),
})

type FormDataProps = {
    descricao: string;
    qtdMinima: number;
    barra: string;
}

export default function EditarProduto({ route }) {

    console.log(route.params.item)
    const produtoSelecionado = route.params.item;

    const toast = useToast();

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(schema),
    })

    const api = useAPI();

    const navigation = useNavigation<StackTypes>();

    async function handleAtualizar(data: FormDataProps) {

        try {
            const response = await api.put(`/produto?id=${produtoSelecionado.id}`, {
                descricao: data.descricao,
                qtd_minima: data.qtdMinima,
                barra: data.barra
            })
            console.log(response.data);

            if (response.data) {
                toast.show({
                    description: 'Produto atualizado com sucesso!',
                    placement: 'top',
                    bg: 'green.500',
                    fontSize: 'md'
                })
            }

        } catch (erro) {
            console.log(`**** ${erro}`);
            toast.show({
                description: 'Erro ao atualizar o produto!',
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
                <Heading />
                <Controller
                    control={control}
                    name='descricao'
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Descrição do produto"
                            onChangeText={onChange}
                            errorMessage={errors.descricao?.message}
                            value={produtoSelecionado.descricao}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='qtdMinima'
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Quantidade mínima em estoque"
                            onChangeText={onChange}
                            keyboardType="numeric"
                            errorMessage={errors.qtdMinima?.message}
                            value={produtoSelecionado.qtd_minima}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='barra'
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Código de barra (EAN13)"
                            onChangeText={onChange}
                            keyboardType="numeric"
                            errorMessage={errors.barra?.message}
                            value={produtoSelecionado.barra}
                        />
                    )}
                />

                <Button
                    title='Salvar'
                    onPress={handleSubmit(handleAtualizar)}
                />
            </Center>
        </VStack>
    )
    
}