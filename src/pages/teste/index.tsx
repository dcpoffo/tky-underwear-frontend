/* eslint-disable */

import React, { useEffect } from 'react'
import { Center, Heading, VStack, Text } from 'native-base'

export default function Teste() {

    useEffect(() => {

    }, [])

    return (
        <VStack flex={1} px={3}>
            <Center>
                <Heading mb={2} mt={2}>Tela de Testes</Heading>
            </Center>
        </VStack>
    )
    
}