import React from 'react';
import { View, StyleSheet } from 'react-native';

import Navbar from '../navbar/navbar';
import InventoryTable from './inventory-table';

const InventoryScreen = () => (
    <View style={styles.container}>
        <Navbar />
        <InventoryTable />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F4F9FF',
    },
});

export default InventoryScreen;
