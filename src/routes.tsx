import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/Home";
import Login from "./pages/Login";
import React from "react";
import ListaProdutos from "./pages/produtos/listar";
import NovoProduto from "./pages/produtos/novo";
import ListaMovimentacoes from "./pages/Movimentacoes/listar";
import NovaMovimentacao from "./pages/Movimentacoes/novo";
import Perfil from "./pages/profile";

const Stack = createNativeStackNavigator();

type StackNavigation = {
    Login: undefined;
    Home: undefined;
    ListaProdutos: undefined;
    NovoProduto: undefined;
    Movimentacoes: undefined;
    NovaMovimentacao: undefined;
    Perfil: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>

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
                name="ListaProdutos"
                component={ListaProdutos}
                options={{ title: 'Lista de Produtos' }} />

            <Stack.Screen
                name="NovoProduto"
                component={NovoProduto}
                options={{ title: 'Novo Produto' }} />

            <Stack.Screen
                name="Movimentacoes"
                component={ListaMovimentacoes}
                options={{ title: 'Movimentações' }} />

            <Stack.Screen
                name="NovaMovimentacao"
                component={NovaMovimentacao}
                options={{ title: "Nova Movimentação" }}
            />

            <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{ title: "Suas informações" }}
            />

        </Stack.Navigator>
    )
}

export default Routes;