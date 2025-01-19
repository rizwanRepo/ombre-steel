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
                <Text style={styles.headerText}>Item Name</Text>
                <Text style={[styles.headerText, { marginLeft: "25%" }]}>Rate/Kg</Text>
                <Text style={styles.headerText}>Quantity</Text>
            </View>

            {items && items.length > 0 ? (
                items.map((item, index) => (
                    <View style={styles.detailsContainer} key={index}>
                        <Text style={[styles.cellDetail, { minWidth: 150 }]}>
                            {item.Item.name}
                        </Text>
                        <Text style={[styles.cellDetail, { minWidth: 60 }]}>
                            {`₹ ${item.rate.toString()}`}
                        </Text>
                        <Text style={[styles.cellDetail, { minWidth: 60 }]}>
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
