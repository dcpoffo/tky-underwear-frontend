import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { StackTypes } from '../../routes';

import React from 'react'

const Cabecalho = () => {

    const navigation = useNavigation<StackTypes>();

    const userEmail = auth().currentUser?.email;    
    const userName = auth().currentUser?.displayName;    

    function handleSignOut() {        
        auth().signOut();
        navigation.navigate("Login");
    }

    return (
        <View style={styles.header}>
            <View style={styles.detalhes}>
            <Text style={styles.textUser}>{userEmail}</Text>
            <Text style={styles.textUser}>{userName}</Text>
            </View>
            <TouchableOpacity style={styles.buttonHeader} onPress={handleSignOut}>
                <MaterialIcons name="logout" size={24} color="blue" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#e6e8ed',
        height: '12%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    buttonHeader: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    }, 
    textUser: {
        fontSize: 18,
    },
    detalhes: {
        flexDirection: 'column',
    }
})

export default Cabecalho