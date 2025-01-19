import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import EmptyListMessage from '../../../../components/empty-list-message/empty-list-message';

const DeliveredItems = ({ items }: { items: any[] }) => (
    <ScrollView style={styles.container}>
        <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Item Name</Text>
            <Text style={[styles.headerText, { marginLeft: '25%' }]}>Rate/Kg</Text>
            <Text style={styles.headerText}>Qty Supplied</Text>
        </View>

        {items && items.length > 0 ? (
            items.map((item, index) => {
                const pendingQuantity = item.qty - item.qtySupplie;
                return (
                    <View style={styles.detailsContainer} key={index}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                width: '100%',
                            }}
                        >
                            <Text style={[styles.cellDetail, { minWidth: 150 }]}>{item.Item.name}</Text>
                            <Text style={[styles.cellDetail, { minWidth: 60 }]}>{`₹ ${item.rate.toString()}`}</Text>
                            <Text style={[styles.cellDetail, { minWidth: 60 }]}>
                                {item.qtySupplie} {item.primaryUnit}
                            </Text>
                        </View>
                        {pendingQuantity > 0 && (
                            <View style={styles.pendingContainer}>
                                <Icon name="alert-circle-outline" size={18} color="#d9534f" style={{ marginHorizontal: 0 }} />
                                <Text style={styles.pendingLabel}>Pending Quantity</Text>
                                <Text style={styles.pendingValue}>{pendingQuantity} {item.primaryUnit}</Text>
                            </View>
                        )}
                    </View>
                )
            })
        ) : (
            <EmptyListMessage title="No delivered orders available." />
        )}
    </ScrollView>
);

export default DeliveredItems;
