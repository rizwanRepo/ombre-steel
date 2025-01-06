import React from 'react';
import { View, StyleSheet } from 'react-native';

import Navbar from '../navbar/navbar';
import TodaySaleTable from './today-sale-table';

const TodaySaleScreen = () => (
    <View style={styles.container}>
        <Navbar />
        <TodaySaleTable />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f4f7',
    },
});

export default TodaySaleScreen;
