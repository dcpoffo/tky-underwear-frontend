import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const listaProdutos = [
    {
        id: 1,
        label: 'Compra de malha',
        type: 0, // 0 = despesa / 1 = receinta
        date: '01/09/2023',
        paymentType: 'Pix',
        value: '120,00'
    },
    {
        id: 2,
        label: 'Venda Cueca',
        type: 1, // 0 = despesa / 1 = receinta
        date: '01/09/2023',
        paymentType: 'Pix',
        value: '36,00'
    },
    {
        id: 3,
        label: 'Conserto Máquina',
        type: 0, // 0 = despesa / 1 = receinta
        date: '02/09/2023',
        paymentType: 'Dinheiro',
        value: '100,00'
    },
]

const Lista = () => {

    return (
        <FlatList
            style={styles.list}
            showsVerticalScrollIndicator={false}
            data={listaProdutos}
            renderItem={({ item }) => <>

                <View style={styles.linhaSuperior}>
                    <Text style={styles.date}>{item.date}</Text>
                    <Text style={styles.tipoPgto}>{item.paymentType}</Text>
                </View>

                <View style={styles.content}>

                    <Text style={styles.label}>{item.label}</Text>

                    <Text style={item.paymentType === 1 ? styles.value : styles.expenses}>
                        {item.paymentType === 1 ? `R$ ${item.value.toFixed(2)}` : `R$ -${item.value.toFixed(2)}`}
                    </Text>

                </View>

                <Text>{item.label}</Text>
                <Text>{item.paymentType}</Text>
            </>}
        />
    )
}


const styles = StyleSheet.create({
    list: {
        marginStart: 14,
        marginEnd: 14,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderColor: '#dadada',
    },
    linhaSuperior: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8
    },
    date: {
        color: '#dadada',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tipoPgto: {
        color: '#dadada',
        fontWeight: 'bold',
        fontSize: 16,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    value: {
        fontSize: 16,
        color: '#2ecc71',
        fontWeight: 'bold',
    },
    expenses: {
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: 'bold',
    }
})

export default Lista


