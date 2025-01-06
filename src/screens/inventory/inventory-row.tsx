import React from 'react';
import { View, Text } from 'react-native';

import RowStyles from './row-styles';

interface InventoryRowProps {
    item: string;
    quantity: string;
}

const InventoryRow = ({ item, quantity }: InventoryRowProps) => {
    return (
        <View style={RowStyles.container}>
            <Text style={RowStyles.item}>{item}</Text>
            <Text style={RowStyles.quantity}>{quantity}</Text>
        </View>
    );
};

export default InventoryRow;
