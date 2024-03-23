/* eslint-disable */
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Center, Heading, VStack } from 'native-base'
import { useAPI } from '../../service/API'

export default function Teste() {

    useEffect(() => {
        loadCores();        
    }, [])

    const [ cores, setCores ] = useState<any[]>([]);
    const [ nomeCore, setNomeCor ] = useState<any>('');

    const api = useAPI();

    const loadCores = async () =>{
        try {
            const result = await api.get("/cores");
            setCores(result.data);
        } catch (e) {
            console.log(e);
        }        
    }

  return (
    <VStack flex={1} px={5}>
        <Center>

        <Heading/>
        <Text> Cor </Text>

              

        </Center>
    </VStack>
    
  )
}