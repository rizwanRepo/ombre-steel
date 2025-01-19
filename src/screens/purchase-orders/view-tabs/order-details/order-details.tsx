import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from './styles';

interface IProps {
    order: {
        grade: string;
        rate: string;
        totalQty: number;
        primaryUnit: string;
    };
    totalQty: number;
}

const OrderDetails = ({ order, totalQty }: IProps) => {
    const pendingQty = order.totalQty - totalQty;
    const pendingQuantity = `${pendingQty} ${order.primaryUnit}`;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Grade</Text>
                <Text style={styles.headerText}>Rate/Kg</Text>
                <Text style={styles.headerText}>Quantity</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[styles.cellDetail, styles.flexCell]}>
                    {order.grade}
                </Text>
                <Text style={[styles.cellDetail, styles.flexCell, { marginHorizontal: 10 }]}>
                    {`₹ ${order.rate}`}
                </Text>
                <Text style={[styles.cellDetail, styles.flexCell]}>
                    {`${order.totalQty} ${order.primaryUnit}`}
                </Text>
            </View>

            {pendingQty > 0 && (
                <View style={styles.pendingContainer}>
                    <Text style={styles.pendingLabel}>Pending Quantity</Text>
                    <Text style={styles.pendingValue}>{pendingQuantity}</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default OrderDetails;
