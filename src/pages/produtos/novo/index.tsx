import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native'
import { StackTypes } from '../../../routes';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

const schema = yup.object({
    descricao: yup
        .string()
        .required("Informe a descrição"),
    qtdMinima: yup
        .string()
        .required("Campo não pode ficar em branco. Pelo menos 0"),

    barra: yup
        .string()
        .required("Campo não pode ficar em branco. Pelo menos 0"),
})


const NovoProduto = () => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const navigation = useNavigation<StackTypes>();
    const [isLoading, setIsLoading] = useState(false);

    function handleCadastrar(data: any) {
        setIsLoading(true);
        firestore()
            .collection('produtos')
            .add({
                descricao: data.descricao,
                qtd_minima: data.qtdMinima,
                barra: data.barra
            })
            .then(() => {
                alert("Produto criado com sucesso!")
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
        <View style={styles.container}>
            <Controller
                control={control}
                name='descricao'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[
                            styles.input, {
                                borderWidth: errors.descricao && 1,
                                borderColor: errors.descricao && '#B0060E'
                            }]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Descrição do produto"
                    />
                )}
            />
            {errors.descricao && <Text style={styles.labelError}>{errors.descricao?.message}</Text>}

            <Controller
                control={control}
                name='qtdMinima'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[
                            styles.input, {
                                borderWidth: errors.qtdMinima && 1,
                                borderColor: errors.qtdMinima && '#B0060E'
                            }]}
                        value={value?.toString()}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="numeric"
                        placeholder="Quantidade mínima em estoque"
                    />
                )}
            />
            {errors.qtdMinima && <Text style={styles.labelError}>{errors.qtdMinima?.message}</Text>}


            <Controller
                control={control}
                name='barra'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[
                            styles.input, {
                                borderWidth: errors.barra && 1,
                                borderColor: errors.barra && '#B0060E'
                            }]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="numeric"
                        placeholder="Código de barra (EAN13)"
                    />
                )}
            />
            {errors.barra && <Text style={styles.labelError}>{errors.barra?.message}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit(handleCadastrar)}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            {isLoading && <ActivityIndicator size="large" />}

        </View >
    )
}

export default NovoProduto

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
        marginBottom: 14,
        padding: 8,
    },
    labelError: {
        alignSelf: 'flex-start',
        color: '#B0060E',
        marginBottom: 15,
        marginTop: 2,
        marginLeft: 10,
        fontSize: 15,
    }

})