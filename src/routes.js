import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListProduts from "./pages/produtos";
import Home from "./pages/Home";
import Movimentacoes from "./pages/movimentações";

const Stack = createNativeStackNavigator();

function Routes() {
    return (
        <Stack.Navigator initialRouteName="Home">

            <Stack.Screen
                name="Home"
                component={Home} />

            <Stack.Screen
                name="ListProduts"
                component={ListProduts}
                options={{ title: 'Lista de Produtos' }} />

            <Stack.Screen
                name="Movimentacoes"
                component={Movimentacoes}
                options={{ title: 'Movimentações' }} />

        </Stack.Navigator>
    )
}

export default Routes;