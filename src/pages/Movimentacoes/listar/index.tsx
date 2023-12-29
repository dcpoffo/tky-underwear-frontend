import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { StackTypes } from '../../../routes';

import { AntDesign } from '@expo/vector-icons';
import { HStack, Icon, IconButton, Spinner, Text, VStack } from 'native-base';
import { Button } from '../../../components/Button';
import { useAPI } from '../../../service/API';

export default function ListaMovimentacoes() {

  const navigation = useNavigation<StackTypes>();

  const [ loading, setLoading ] = useState(true);
  const [ movimentacoes, setMovimentacoes ] = useState<any[]>([]);

  const api = useAPI();

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('movimentacoes')
  //     .onSnapshot(querySnapshot => {
  //       const movimentacoes: any[] = [];

  //       querySnapshot.forEach(documentSnapshot => {
  //         movimentacoes.push({
  //           ...documentSnapshot.data(),
  //           key: documentSnapshot.id,
  //         });

  //       });
  //       setMovimentacoes(movimentacoes);
  //       setLoading(false);
  //     });

  //   return () => subscriber();
  // }, []);

  useEffect(() => {
    loadProducts();
  }, [ movimentacoes ])

  const loadProducts = async () => {

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

  if (loading) {
    return (
      <HStack flex={1} justifyContent={'center'}>
        <Spinner size={'lg'} />
      </HStack>
    )
  }

  function handleNovo() {
    navigation.navigate("NovaMovimentacao");
  }

  return (
    <>
      <VStack flex={1} px={5}>
        
        <Button                  
          title='Nova movimentação'
          onPress={handleNovo}
          marginTop={3}
          marginBottom={3}
        />
        
        {/* <HStack
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
            Últimas movimentações
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
        </HStack> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={movimentacoes}
          renderItem={({ item }) => <>
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
              borderBottomWidth={5}
              borderColor={'#dadada'}
              marginBottom={4}
            >
              <Text fontSize={16}>{item.label}</Text>
              {
                item.type === 1 ?
                  <Text color={'#2ecc71'} fontWeight= {'bold'}>
                    R$ {item.value}
                  </Text>
                  :
                  <Text color={'#e74c3c'} fontWeight= {'bold'}>
                    R$ - {item.value}
                  </Text>
              }

            </HStack>
          </>} />

      </VStack>
    </>    
  )
}