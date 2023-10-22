import { StyleSheet, Text, View, FlatList } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import React, { useEffect } from 'react'

const listaProdutos = [
    {
        id: 1,
        descricao: 'Cueca básica tamanho P',
        qtd_minima: 0,
        barra: '7777774138576'
    },
    {
        id: 2,
        descricao: 'Cueca básica tamanho M',
        qtd_minima: 0,
        barra: '7777765144272'
    },
    {
        id: 3,
        descricao: 'Cueca básica tamanho G',
        qtd_minima: 0,
        barra: '7777713235342'
    },
    {
        id: 4,
        descricao: 'Cueca básica tamanho GG',
        qtd_minima: 0,
        barra: '7777775831551'
    },
]

const Lista = () => {

    return (
        <FlatList
            style={styles.list}
            showsVerticalScrollIndicator={false}
            data={listaProdutos}
            renderItem={({ item }) => <>

                <View style={styles.linhaSuperior}>
                    <Text style={styles.title}>Descrição</Text>
                    <Text style={styles.title}>Qtd.Mín.Estoque</Text>
                </View>
                <View style={styles.linhaSuperior}>
                    <Text style={styles.descricao}>{item.descricao}</Text>
                    <Text style={styles.descricao}>{item.qtd_minima}</Text>
                </View>

                <View style={styles.barra}>
                    <Text style={styles.title}>Cód. Barra</Text>
                    <Text>{item.barra}</Text>
                </View>
            </>}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        marginStart: 10,
        marginEnd: 10,
    },
    barra: {
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8,
        borderBottomWidth: 5,
        borderColor: '#dadada',
    },
    linhaSuperior: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    descricao: {
        // fontWeight: 'bold',
        fontSize: 16,
    }
})

export default Lista


