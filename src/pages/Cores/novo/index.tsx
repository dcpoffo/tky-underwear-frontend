/* eslint-disable */
import { View, Text } from 'react-native'
import React from 'react'
import { Center, Heading, VStack } from 'native-base'
import { Button } from '../../../components/Button'

export default function NovaCor() {
  return (
    <VStack flex={1} px={5}>
        <Center>
            <Heading/>

            <Text>Nova Cor</Text>

            <Button
                title='Salvar'                
            />
        </Center>
        
    </VStack>
  )
}