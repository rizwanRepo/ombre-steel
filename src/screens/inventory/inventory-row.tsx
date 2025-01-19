import React from 'react';
import { View, Text } from 'react-native';

import RowStyles from './row-styles';

interface IProps {
    itemName: string;
    quantity: string;
    unit: string;
}

const InventoryRow = ({ itemName, quantity, unit }: IProps) => (
    <View style={RowStyles.container}>
        <Text style={RowStyles.itemName}>{itemName}</Text>
        <Text style={RowStyles.quantity}>{quantity} {unit}</Text>
    </View>
);

export default InventoryRow;
