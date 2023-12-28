import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { useAPI } from '../../service/API';
import { Text, FlatList, HStack, VStack, Spinner } from 'native-base';

// auth().currentUser?.updateProfile({
//   displayName: "Darlan R. C. Poffo"
// })   

export default function Perfil() {
    const [ userName, setUserName ] = useState<any>("");
    const [ loading, setLoading ] = useState(true);

    const [ produtos, setProdutos ] = useState({
        descricao: "",
        qtdMinima: "",
        barraCli: ""
    })

    const api = useAPI();

    function handleUpdate() {
        auth().currentUser?.updateProfile({
            displayName: userName
        })
    }

    useEffect(() => {
        //setUserName(auth().currentUser?.displayName)
        loadProducts();
    }, []);

    // async function loadProducts(){
    //     try {
    //         const response = await api.get("/produtos")            
    //         console.log(response.data)
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     finally {
    //         setLoading(false)
    //     }
    // }

    
    const loadProducts = async () => {

        try {
            const result = await api.get("/produtos");
            console.log(result.data);
            setProdutos(result.data);
        } catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <HStack flex={1} justifyContent={'center'}>
                <Spinner size={'lg'} />
            </HStack>
        )
    }

    return (
        <VStack flex={1}>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={produtos}
                renderItem={({ item }) =>
                    <>
                        <HStack justifyContent={'space-between'}>
                            <Text fontWeight={'bold'} fontSize={16}>
                                Descrição
                            </Text>
                            <Text fontWeight={'bold'} fontSize={16}>
                                Qtd.Mín.Estoque
                            </Text>
                        </HStack>

                        <HStack justifyContent={'space-between'}>
                            <Text fontSize={16}>{item.descricao}</Text>
                            <Text fontSize={16}>{item.qtd_minima}</Text>
                        </HStack>

                        <VStack
                            justifyContent={'space-between'}
                            borderBottomWidth={5}
                            borderColor={'#dadada'}
                            marginBottom={4}
                        >
                            <Text fontWeight={'bold'} fontSize={16}>Cód. Barra</Text>
                            <Text>{item.barraCli}</Text>
                        </VStack>
                    </>
                } />
        </VStack>

        //</VStack>
        // <View style={styles.container}>
        //     <Text style={styles.title}>Altere seu nome, conforme desejado</Text>
        //     <TextInput style={styles.input}
        //         value={userName}
        //     />

        //     <TouchableOpacity style={styles.button}
        //         onPress={handleUpdate}>
        //         <Text style={styles.buttonText}>Salvar Alterações</Text>
        //     </TouchableOpacity>

        // </View>
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