/* eslint-disable */

import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
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

    // function handleCores() {
    //     navigation.navigate('Cores');
    // }

    function handleTestes() {
        navigation.navigate('TelaTeste')
    }
    
    return (
        <VStack flex={1} alignItems={'center'} justifyContent={'center'} margin={4}>

            <Button
                title="Produtos"                
                onPress={handleProdutos}
                marginBottom={5}
            />
            {/* <Button
                title="Cores"
                onPress={handleCores}
                marginBottom={5}

            />   */}
            <Button
                title="Movimentações"                
                onPress={handleMovimentacoes}
                marginBottom={5}

            />     

            <Button
                title="Tela de Testes"
                onPress={handleTestes}
                marginBottom={5}

            />           
        </VStack>
    )
}