/* eslint-disable */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { StackTypes } from '../../../routes';

import { HStack, Pressable, Spinner, Text, VStack, useToast } from 'native-base';
import { Button } from '../../../components/Button';
import { useAPI } from '../../../service/API';

export default function ListaMovimentacoes() {

    const navigation = useNavigation<StackTypes>();

    const [ loading, setLoading ] = useState(true);
    const [ movimentacoes, setMovimentacoes ] = useState<any[]>([]);

    const api = useAPI();
    const toast = useToast();

    useEffect(() => {
        carregarMovimentacoesEstoque();
    }, [ movimentacoes ])

    const carregarMovimentacoesEstoque = async () => {

        try {
            const result = await api.get("/movimentacoes");
            setMovimentacoes(result.data);
        } catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false);
        }
    };

    function handleNovo() {
        navigation.navigate("NovaMovimentacao");
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
        <>
            <VStack flex={1} px={2}>

                <Button
                    title='Nova movimentação'
                    onPress={handleNovo}
                    marginTop={3}
                    marginBottom={3}
                />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={movimentacoes}
                    renderItem={({ item }) =>
                        <>
                            <Pressable
                                rounded="8"
                                overflow="hidden"
                                borderWidth="1"
                                borderColor="coolGray.300"
                                bg="coolGray.200"
                                p="2"
                                marginBottom={2}
                                onPress={() => {
                                    // toast.show({
                                    //   description: item.id,
                                    //   placement: 'top',
                                    //   bg: 'green.500',
                                    //   fontSize: 'md'
                                    // })
                                    const itemRecebido = item.id
                                    // console.log({ itemRecebido })
                                }}
                            >
                                <HStack justifyContent={'space-between'}>
                                    <Text color={'#2f59f5'} fontWeight={'bold'} fontSize={16} >
                                        {item.date}
                                    </Text>
                                    <Text color={'#2f59f5'} fontWeight={'bold'} fontSize={16} >
                                        {item.paymentType}
                                    </Text>
                                </HStack>

                                <HStack
                                    justifyContent={'space-between'}
                                // borderBottomWidth={5}
                                //borderColor={'#dadada'}
                                //marginBottom={4}
                                >
                                    <Text fontSize={16}>{item.label}</Text>
                                    {
                                        item.type === '1'
                                            ?
                                            <Text color={'#2ecc71'} fontWeight={'bold'}>
                                                R$ {item.valor.toFixed(2).replace('.', ',')}
                                            </Text>
                                            :
                                            <Text color={'#e74c3c'} fontWeight={'bold'}>
                                                R$ - {item.valor.toFixed(2).replace('.', ',')}
                                            </Text>
                                    }

                                </HStack>
                            </Pressable>
                        </>
                    }
                />

            </VStack>
        </>
    )
}