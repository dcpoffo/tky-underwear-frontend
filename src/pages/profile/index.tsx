import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import auth from '@react-native-firebase/auth';

import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

// auth().currentUser?.updateProfile({
//   displayName: "Darlan R. C. Poffo"
// })   

export default function Perfil() {
    const [userName, setUserName] = useState<any>("");

    function handleUpdate() {
        auth().currentUser?.updateProfile({
            displayName: userName
        })
    }

    useEffect(() => {
        setUserName(auth().currentUser?.displayName)
    });

    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Altere seu nome, conforme desejado</Text>
            <TextInput style={styles.input}
                value={userName}
            />
            <Layout
                style={styles.content}
                level='1'>
                <Select
                    selectedIndex={selectedIndex}
                    onSelect={index => {
                        setSelectedIndex(index)
                    }}
                >

                    <SelectItem
                        title='Option 1'
                        onPressOut={() => {
                            alert('teste 1')
                        }} />
                    <SelectItem
                        title='Option 2'
                        onPressOut={() => {
                            alert('teste 2')
                        }} />
                    <SelectItem
                        title='Option 3'
                        onPressOut={() => {
                            alert('teste 3')
                        }} />

                </Select>
            </Layout>
            <TouchableOpacity style={styles.button}
                onPress={handleUpdate}>
                <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        width: 150
    },
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10,
    }
})