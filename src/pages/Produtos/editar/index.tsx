/* eslint-disable */
import React, { useEffect, useState } from 'react';

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
    qtd_minima: yup
        .number().default(0)
        .transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value),
    barra: yup
        .string().default(''),
})

type FormDataProps = {
    descricao: string;
    qtd_minima: number;
    barra: string;
}

export default function EditarProduto({ route }) {

    const id = route.params.item.id;

    const [ descricao, setDescricao ] = useState('');
    const [ qtdMinima, setQtdMinima ] = useState(0);
    const [ barra, setBarra ] = useState('0');

    const toast = useToast();

    const { control, setValue, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(schema),
        defaultValues: {
            descricao: descricao,
            qtd_minima: qtdMinima,
            barra: barra,
        }
    })

    useEffect(() => {
        if (!route.params)
            return;

        setValue('descricao', route.params.item.descricao);
        setValue('qtd_minima', route.params.item.qtd_minima);
        setValue('barra', route.params.item.barra);

    }, [ route.params.item, setValue ])

    const api = useAPI();

    const navigation = useNavigation<StackTypes>();

    async function handleAtualizar(data: FormDataProps) {

        console.log(data.descricao);

        try {
            const response = await api.put(`/produto?id=${id}`, {
                descricao: data.descricao,
                qtd_minima: data.qtd_minima,
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
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Descrição do produto"
                            onChangeText={onChange}
                            value={value || descricao}
                            errorMessage={errors.descricao?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='qtd_minima'
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Quantidade mínima em estoque"
                            onChangeText={onChange}
                            value={value.toString() || qtdMinima.toString()}
                            keyboardType="numeric"
                            errorMessage={errors.qtd_minima?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='barra'
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Código de barra (EAN13)"
                            onChangeText={onChange}
                            value={value || barra}
                            keyboardType="numeric"
                            errorMessage={errors.barra?.message}
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