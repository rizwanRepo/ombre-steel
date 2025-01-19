import React from 'react';
import { View, StyleSheet } from 'react-native';

import Navbar from '../navbar/navbar';
import OrderListView from './order-list-view/order-list-view';

const PurchaseOrderScreen = () => (
    <View style={styles.container}>
        <Navbar />
        <OrderListView />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F4F9FF',
    },
});

export default PurchaseOrderScreen;
