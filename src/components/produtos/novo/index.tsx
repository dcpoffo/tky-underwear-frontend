import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const NovoProduto = () => {

    const [descricao, setDescricao] = useState('');
    const [qtdMinima, setQtdMinima] = useState('');
    const [barra, setBarra] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleCadastrar() {
        setIsLoading(true);
        //firestore()            
    }

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                value={descricao}
                onChangeText={(text) => setDescricao(text)}
                placeholder="Descrição do produto"
            />
            <TextInput
                style={styles.input}
                value={qtdMinima}
                onChangeText={(text) => setQtdMinima(text)}
                keyboardType="numeric"
                placeholder="Quantidade mínima em estoque"
            />
            <TextInput
                style={styles.input}
                value={barra}
                onChangeText={(text) => setBarra(text)}
                keyboardType="numeric"
                placeholder="Código de barra (EAN13)"
            />

            <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            {isLoading && <ActivityIndicator color={'#AAAAAA'} />}

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

})