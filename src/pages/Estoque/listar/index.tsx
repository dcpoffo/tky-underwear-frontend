/* eslint-disable */

import { FlatList, HStack, Pressable, Spinner, Text, VStack, useToast } from "native-base";
import { Button } from "../../../components/Button";
import { useEffect, useState } from "react";
import { useAPI } from "../../../service/API";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../../routes";


export default function ListaEstoque() {

    const [ loading, setLoading ] = useState(true);
    const [ movimentacoesEstoque, setMovimentacoesEstoque ] = useState<any[]>([]);

    const navigation = useNavigation<StackTypes>();
    const api = useAPI();
    const toast = useToast();

    useEffect(() => {
        loadMovimentacoesEstoque()
    }, [ movimentacoesEstoque ]);

    const loadMovimentacoesEstoque = async () => {
        try {
            const result = await api.get("/estoque");
            setMovimentacoesEstoque(result.data);
            // console.log(result.data)
        } catch (e) {
            console.log(e);
            toast.show({
                description: "Erro ao carregar dados. Tente novamente mais tarde.",
                bg: "red.500"
            });
        }
        finally {
            setLoading(false);
        }
    }

    function handleNovo() {
        navigation.navigate("NovaMovimentacaoEstoque");
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
                    title="Nova movimentação"
                    onPress={handleNovo}
                    marginTop={3}
                    marginBottom={3}
                />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={movimentacoesEstoque}
                    renderItem={({ item }) =>
                        <>
                            <Pressable
                                rounded={"8"}
                                overflow={"hidden"}
                                borderWidth={1}
                                borderColor={"coolGray.300"}
                                p={2}
                                marginBottom={2}
                            >

                                <HStack justifyContent={"space-between"}>

                                    <VStack>
                                        <HStack>
                                            <Text color={'#2f59f5'} fontWeight={'bold'} fontSize={16}>Tipo: </Text>
                                            {
                                                item.tipo === '0'
                                                    ? <Text fontSize={16} color={'#2ecc71'}>{item.descricao}</Text>
                                                    : <Text fontSize={16} color={'#e74c3c'}>{item.descricao}</Text>
                                            }
                                        </HStack>
                                    </VStack>

                                    <VStack>
                                        <HStack>                                            
                                            <Text fontSize={16} color={'#2f59f5'} fontWeight={'bold'}>
                                                {new Date(item.data).toLocaleDateString('pt-BR', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </Text>
                                        </HStack>
                                    </VStack>
                                    
                                </HStack>

                                <HStack>
                                    <Text color={'#2f59f5'} fontWeight={'bold'} fontSize={16}>Produto: </Text>
                                    <Text fontSize={16}>{item.produto.descricao} </Text>
                                    <Text fontSize={16}>{item.produto.modelagem} </Text>
                                    <Text fontSize={16}>{item.produto.tipo} </Text>
                                    <Text fontSize={16}>{item.produto.grade}</Text>
                                </HStack>

                                <HStack>
                                    <Text color={'#2f59f5'} fontWeight={'bold'} fontSize={16}>Quantidade: </Text>
                                    <Text fontSize={16}>{item.quantidade}</Text>
                                </HStack>
                            </Pressable>
                        </>
                    }
                />
            </VStack>
        </>

    )

}

