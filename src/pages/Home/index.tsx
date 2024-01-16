/* eslint-disable */

import { useNavigation } from "@react-navigation/native";
import { HStack, Text, VStack } from "native-base";
import { StackTypes } from "../../routes";
import { Button } from "../../components/Button";

export default function Home() {

    const navigation = useNavigation<StackTypes>();

    function handleProdutos() {
        navigation.navigate('Produtos');
    }

    function handleMovimentacoes() {
        navigation.navigate('Movimentacoes');
    }

    return (
        <VStack flex={1} alignItems={'center'} justifyContent={'center'} margin={4}>

            <Button
                title="Produtos"                
                onPress={handleProdutos}
                marginBottom={5}
            />
            <Button
                title="Movimentações"                
                onPress={handleMovimentacoes}
                marginBottom={5}

            />  

            {/* <VStack alignItems={'center'} width={'full'}>
                <Text>Home</Text>
                <Button
                    title="Voltar"
                    onPress={() => { navigation.goBack() }}
                >
                </Button>
            </VStack>

            <HStack width={'full'} justifyContent={'space-between'} margin={4}>
                <Button
                    title="Produtos"
                    onPress={() => { navigation.navigate('Produtos') }}
                >
                </Button>

                <Button
                    title="Movimentações"
                    onPress={() => { navigation.navigate('Movimentacoes') }}
                >
                </Button>
            </HStack> */}
        </VStack>
    )
}