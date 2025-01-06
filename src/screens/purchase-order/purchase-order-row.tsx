import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import RowStyles from './row-styles';

interface IProps {
    item: string;
    quantity: string;
    status: string;
}

const PurchaseOrderRow = ({ item, quantity, status }: IProps) => {
    const isCompleted = status.toLowerCase() === 'completed';

    return (
        <View style={RowStyles.container}>
            <View style={RowStyles.itemContainer}>
                <Text style={RowStyles.item}>{item}</Text>
            </View>

            <View style={RowStyles.quantityContainer}>
                <Text style={RowStyles.quantity}>{quantity}</Text>
            </View>

            <View style={RowStyles.statusContainer}>
                <TouchableOpacity
                    style={[RowStyles.button, isCompleted ? RowStyles.completed : RowStyles.notCompleted]}
                    activeOpacity={0.7}
                >
                    <Text style={RowStyles.buttonText}>{status}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PurchaseOrderRow;
