import React from 'react';
import { View, StyleSheet } from 'react-native';

import Navbar from '../navbar/navbar';
import SaleOrders from './sale-orders/sale-orders';

const SaleOrderScreen = () => (
    <View style={styles.container}>
        <Navbar />
        <SaleOrders />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f4f7',
    },
});

export default SaleOrderScreen;
