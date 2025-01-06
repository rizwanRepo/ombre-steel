import React from 'react';
import { View, StyleSheet } from 'react-native';

import Navbar from '../navbar/navbar';
import PurchaseOrderTable from './purchase-order-table';

const PurchaseOrderScreen = () => (
    <View style={styles.container}>
        <Navbar />
        <PurchaseOrderTable />
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
