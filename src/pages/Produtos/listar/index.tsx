/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { FlatList, HStack, Pressable, Spinner, Text, VStack, useToast } from 'native-base';
import { Button } from '../../../components/Button';
import { useAPI } from '../../../service/API';

export default function ListaProdutos({ navigation: { navigate } } ) {

  const [ loading, setLoading ] = useState(true);
  const [ produtos, setProdutos ] = useState<any[]>([]);

  const api = useAPI();
  const toast = useToast();
  
  useEffect(() => {
    loadProducts();
  }, [ produtos ])

  const listaProdutos = [
    {
      id: 19,
      descricao: 'produto 1',
      barra: '1'
    },
    {
      id: 20,
      descricao: 'produto 2',
      barra: '2'
    }, {
      id: 3,
      descricao: 'produto 3',
      barra: '3'
    }, {
      id: 4,
      descricao: 'produto 4',
      barra: '4'
    }
  ]

  const loadProducts = async () => {

    try {
      const result = await api.get("/produtos");
      setProdutos(result.data);
    } catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false);
    }
  };

  function handleNovo() {    
    navigate("NovoProduto");
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
      <VStack
        flex={1}
        px={2}
        justifyContent={"center"}
      >

        <Button
          title='Novo Produto'
          onPress={handleNovo}
          marginTop={3}
          marginBottom={3}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={produtos}
          //data={listaProdutos}
          renderItem={({ item }) =>
            <>
              <Pressable
                onPress={() => {
                  const produtoSelecionado = {
                    id: item.id,
                    descricao: item.descricao,                    
                    barra: item.barra
                  }                  
                  navigate("EditarProduto", {item})
                  
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
                  <Text fontWeight={'bold'} fontSize={16}>Cód. Barra</Text>
                </HStack>

                <HStack justifyContent={'space-between'}>
                  <Text fontSize={16}>{item.descricao}</Text>
                  <Text fontSize={16}>{item.barra}</Text>
                </HStack>
                
              </Pressable>
            </>
          } />
      </VStack>
    </>
  )
}