import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import auth from '@react-native-firebase/auth';

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Altere seu nome, conforme desejado</Text>
            <TextInput style={styles.input}
                value={userName}
            />
            
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