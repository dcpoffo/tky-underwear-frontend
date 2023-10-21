import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/Home";
import Movimentacoes from "./components/movimentações";
import Login from "./pages/Login";
import React from "react";
import ListProduts from "./components/produtos/listar";
import NovoProduto from "./components/produtos/novo";

const Stack = createNativeStackNavigator();

function Routes() {

    return (
        <Stack.Navigator initialRouteName="Login">

            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Home"
                component={Home} 
            options={{ headerShown: false }} />

            <Stack.Screen
                name="ListProduts"
                component={ListProduts}
                options={{ title: 'Lista de Produtos' }} />
            
            <Stack.Screen
                name="NovoProduto"
                component={NovoProduto}
                options={{ title: 'Novo Produto' }} />

            <Stack.Screen
                name="Movimentacoes"
                component={Movimentacoes}
                options={{ title: 'Movimentações' }} />

        </Stack.Navigator>
    )
}

export default Routes;