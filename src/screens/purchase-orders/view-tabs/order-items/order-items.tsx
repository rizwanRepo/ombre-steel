import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import styles from './styles';
import EmptyListMessage from '../../../../components/empty-list-message/empty-list-message';

const OrderItems = ({ items }: { items: any[] }) => (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
        <ScrollView style={styles.container}>
            <View style={styles.tableHeader}>
                <Text style={[styles.headerText, { width: "40%", }]}>Item Name</Text>
                <Text style={[styles.headerText, { width: "20%" }]}>Rate/Kg</Text>
                <Text style={[styles.headerText, { width: "20%", }]}>Quantity</Text>
            </View>

            {items && items.length > 0 ? (
                items.map((item, index) => (
                    <View style={styles.detailsContainer} key={index}>
                        <Text style={[styles.cellDetail, { width: "45%", fontSize: 12 }]}>
                            {item.Item.name}
                        </Text>
                        <Text style={[styles.cellDetail, { minWidth: 60, width: "25%" }]}>
                            {`₹ ${item.rate.toString()}`}
                        </Text>
                        <Text style={[styles.cellDetail, { minWidth: 60, width: "25%" }]}>
                            {item.qty.toString()} {item.primaryUnit}
                        </Text>
                    </View>
                ))
            ) : (
                <EmptyListMessage title="You don't have any orders yet." />
            )}
        </ScrollView>
    </KeyboardAvoidingView>
);

export default OrderItems;
