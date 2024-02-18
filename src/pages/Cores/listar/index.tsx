/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { VStack, Text, Spinner, FlatList, Pressable, HStack, useToast } from 'native-base'
import { Button } from '../../../components/Button'
import { useAPI } from '../../../service/API';

export default function ListaCores({ navigation: { navigate } }) {

    const [ loading, setLoading ] = useState(true);
    const [ cores, setCores ] = useState<any[]>([]);

    const api = useAPI();
    const toast = useToast();

    useEffect(() => {
        loadCores();
    }, [ cores ])    

    const loadCores = async () => {

        try {
            const result = await api.get("/cores");
            setCores(result.data);
        } catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false);
        }
    };

    function handleNova() {
        navigate("NovaCor")
    }

    if (loading) {
        return (
            <VStack flex={1} justifyContent={'center'} alignItems={'center'}>
                <Text marginBottom={5} fontSize={16} fontWeight={'bold'}>
                    Carregando informações
                </Text>
                <Spinner size={'lg'} />
            </VStack>
        )
    }

    return (
        <VStack
            flex={1}
            px={2}
            justifyContent={"center"}
        >

            <Button
                title='Nova Cor'
                onPress={handleNova}
                marginTop={3}
                marginBottom={3}
            />

            <FlatList
                showsVerticalScrollIndicator={false}
                data={cores}
                //data={listaProdutos}
                renderItem={({ item }) =>
                    <>
                        <Pressable
                            onPress={() => {
                                const corSelecionada = {
                                    id: item.id,
                                    descricao: item.descricao,
                                }
                                navigate("EditarCor", { item })

                            }}

                            rounded="8"
                            overflow="hidden"
                            borderWidth="1"
                            borderColor="coolGray.300"
                            bg="coolGray.200"
                            p="2"
                            marginBottom={2}
                        >


                            <HStack justifyContent={'space-between'}>
                                <Text fontWeight={'bold'} fontSize={16}>Descrição</Text>
                            </HStack>

                            <HStack justifyContent={'space-between'}>
                                <Text fontSize={16}>{item.descricao}</Text>
                            </HStack>

                        </Pressable>
                    </>
                } />

        </VStack>
    )
}