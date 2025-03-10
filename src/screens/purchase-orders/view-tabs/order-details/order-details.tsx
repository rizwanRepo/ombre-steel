import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface IProps {
    order: {
        grade: string;
        rate: string;
        totalQty: number;
        primaryUnit: string;
        itemType: string;
    };
    totalQty: number;
}

const OrderDetails = ({ order, totalQty }: IProps) => {
    const pendingQty = order.totalQty - totalQty;
    const pendingQuantity = `${pendingQty} ${order.primaryUnit}`;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.label}>Grade</Text>
                        <Text style={styles.value}>{order.grade}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.label}>Item Type</Text>
                        <Text style={styles.value}>{order.itemType}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.label}>Rate/Kg</Text>
                        <Text style={styles.value}>{`₹ ${order.rate}`}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.label}>Quantity</Text>
                        <Text style={styles.value}>{`${order.totalQty} ${order.primaryUnit}`}</Text>
                    </View>
                </View>

                {pendingQty > 0 && (
                    <View style={[styles.row, { marginTop: 30 }]}>
                        <Text style={[styles.pendingLabel, styles.cell]}>Pending Quantity</Text>
                        <Text style={[styles.pendingValue, styles.cell]}>{pendingQuantity}</Text>
                    </View>
                )}
            </View>

        </ScrollView>
    );
};

export default OrderDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginTop: 40
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        gap: 10
    },
    cell: {
        flex: 2,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    value: {
        fontSize: 14,
        color: '#000',
        borderWidth: 1,
        padding: 10,
        borderColor: '#ddd',
        height: 50,
        borderRadius: 8,
        textAlignVertical: "center",
        backgroundColor: "#f1f1f1",
    },
    pendingLabel: {
        fontSize: 18,
        fontWeight: '500',
        color: '#d9534f',
        marginRight: 10,
    },
    pendingValue: {
        fontSize: 18,
        fontWeight: '500',
    },
});
