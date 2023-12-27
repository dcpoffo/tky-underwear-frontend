import React, { useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../routes';

import { FlatList, HStack, Icon, IconButton, Spinner, Text, VStack } from 'native-base';

import { AntDesign } from '@expo/vector-icons';
import { useAPI } from '../../../service/API';

export default function ListaProdutos() {

  const navigation = useNavigation<StackTypes>();
  const [ loading, setLoading ] = useState(true);
  const [ produtos, setProdutos ] = useState<any[]>([]);
  const [ qtdProdutos, setQtdPtodutos ] = useState(0);

  const api = useAPI();

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('produtos')
  //     .onSnapshot(querySnapshot => {
  //       const produtos: any[] = [];

  //       querySnapshot.forEach(documentSnapshot => {
  //         produtos.push({
  //           ...documentSnapshot.data(),
  //           key: documentSnapshot.id,
  //         });
  //         setQtdPtodutos(querySnapshot.size)
  //       });

  //       setProdutos(produtos);
  //       setLoading(false);
  //     });

  //   // Unsubscribe from events when no longer in use
  //   return () => subscriber();
  // }, []);

  useEffect(() => {
    loadProducts();
  }, [])

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

  function handleNovo() {
    navigation.navigate("NovoProduto");
  }

  if (loading) {
    return (
      <HStack flex={1} justifyContent={'center'}>
        <Spinner size={'lg'} />
      </HStack>
    )
  }

  return (
    <>
      {/* <Cabecalho /> */}
      <VStack flex={1} px={5}>

        <HStack
          justifyContent={'space-between'}
          borderBottomWidth={2}
          borderBottomColor={'#dadada'}
          alignItems={'center'}
          marginTop={5}
        >
          <Text
            textAlign={'center'}
            fontSize={18}
            fontWeight={'bold'}
            marginBottom={2}
          >
            Produtos Cadastrados: {qtdProdutos}
          </Text>

          <IconButton
            icon={
              <Icon as={AntDesign} name='plus' color={'black'} size={'sm'} />
            }
            variant={'outline'}
            // size={'md'}
            borderRadius={30}
            _pressed={{ bg: 'blue.300' }}
            onPress={handleNovo}
          >
          </IconButton>

        </HStack>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={produtos}          
          renderItem={({ item, index }) =>
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
                <Text>{item.barra}</Text>
              </VStack>
            </>
          } />
      </VStack>
    </>
  )
}