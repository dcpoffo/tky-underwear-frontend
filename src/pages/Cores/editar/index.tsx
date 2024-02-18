/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../routes';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { Center, Heading, VStack, useToast } from 'native-base';
import { useAPI } from '../../../service/API';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

const schema = yup.object({
    descricao: yup
        .string().min(3, "Descrição com no mínimo 3 caracteres")
        .required("Informe a descrição")
        .max(20, "No máximo 20 caracteres")
})

type FormDataProps = {
    descricao: string;
}

export default function EditarCor({ route }) {

    const id = route.params.item.id;

    const [ descricao, setDescricao ] = useState('');

    const toast = useToast();

    const { control, setValue, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(schema),
        defaultValues: {
            descricao: ''
        }
    })

    useEffect(() => {

        if (!route.params)
            return;

        setValue('descricao', route.params.item.descricao)

    }, [ route.params.item, setValue ])

    const api = useAPI();

    const navigation = useNavigation<StackTypes>();

    async function handleAtualizar(data: FormDataProps) {

        try {
            const response = await api.put(`/cor?id=${id}`, {
                descricao: data.descricao
            })
            console.log(response.data);

            if (response.data) {
                toast.show({
                    description: 'Cor atualizada com sucesso!',
                    placement: 'top',
                    bg: 'green.500',
                    fontSize: 'md'
                })
            }

        } catch (erro) {
            console.log(`**** ${erro}`);
            toast.show({
                description: 'Erro ao atualizar a cor!',
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
            <Heading />
                <Controller
                    control={control}
                    name='descricao'
                    render={({ field: { onChange, value } }) => (
                        <Input                            
                            placeholder="Descrição da cor"
                            onChangeText={onChange}
                            value={value || descricao}
                            errorMessage={errors.descricao?.message}
                        />
                    )}                    
                />    

                <Button
                    title='Salvar'
                    onPress={handleSubmit(handleAtualizar)}
                />
                     
          
        </VStack>
    )
}

