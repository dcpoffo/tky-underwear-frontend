/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable eslint-comments/no-unlimited-disable */

import { Spinner, Text, VStack } from "native-base";
import { useState } from "react";

/* eslint-disable */
export default function EditarProduto( {route} ) {  
    
    console.log(route.params)
    
    const [ loading, setLoading ] = useState(true);    

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
            <VStack flex={1} px={2} justifyContent={"center"}>
                <Text> Editar produto </Text>               
            </VStack>
        </>
    )
}