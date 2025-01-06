import React from 'react';
import { View, StyleSheet } from 'react-native';

import RateTable from './rate-table';
import Navbar from '../navbar/navbar';

const RateScreen = () => (
    <View style={styles.container}>
        <Navbar />
        <RateTable />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F4F9FF',
    },
});

export default RateScreen;
