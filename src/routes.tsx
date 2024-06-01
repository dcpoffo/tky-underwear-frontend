/* eslint-disable */
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/Home";
import Login from "./pages/Login";
import React from "react";
import ListaProdutos from "./pages/Produtos/listar";
import NovoProduto from "./pages/Produtos/novo";
import ListaMovimentacoes from "./pages/Movimentacoes/listar";
import NovaMovimentacao from "./pages/Movimentacoes/novo";
import EditarProduto from "./pages/Produtos/editar";
import NovaCor from "./pages/Cores/novo";
import ListaCores from "./pages/Cores/listar";
import EditarCor from "./pages/Cores/editar";
import Teste from "./pages/Teste";
import ListaEstoque from "./pages/Estoque/listar";
import NovaMovimentacaoEstoque from "./pages/Estoque/novo";

const Stack = createNativeStackNavigator();

type StackNavigation = {
    Login: undefined;
    Home: undefined;
    Produtos: undefined;
    NovoProduto: undefined;
    EditarProduto: undefined;
    Movimentacoes: undefined;
    NovaMovimentacao: undefined;

    ListaEstoque: undefined;
    NovaMovimentacaoEstoque: undefined;

    Perfil: undefined;
    TelaTeste: undefined;
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
                name="Produtos"
                component={ListaProdutos}
                options={{ title: 'Lista de Produtos' }} />

            <Stack.Screen
                name="NovoProduto"
                component={NovoProduto}
                options={{ title: 'Novo Produto' }} />

            <Stack.Screen
                name="EditarProduto"
                component={EditarProduto}
                options={{ title: 'Editar Produto' }} />

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
                name="ListaEstoque"
                component={ListaEstoque}
                options={{ title: "Movimentação de Estoque" }}
            />

            <Stack.Screen
                name="NovaMovimentacaoEstoque"
                component={NovaMovimentacaoEstoque}
                options={{ title: "Entrada / Saida de Estoque"}}
            />

            <Stack.Screen
                name="TelaTeste"
                component={Teste}
                options={{ title: "Testes" }}
            />

        </Stack.Navigator>
    )
}

export default Routes;