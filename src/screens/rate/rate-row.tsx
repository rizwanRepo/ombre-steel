import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import RowStyles from './row-styles';

interface IProps {
    item: {
        item: string;
        rate: string;
        change: string;
    };
}

const RateRow = ({ item }: IProps) => {
    const { item: itemName, rate, change } = item;

    const changeStyle = useMemo(() => (
        change?.startsWith('+') ? RowStyles.changeUp : RowStyles.changeDown
    ), [change]);

    return (
        <View style={RowStyles.row}>
            <Text style={RowStyles.itemText}>{itemName}</Text>

            <View style={RowStyles.rateContainer}>
                <Text style={RowStyles.rate}>{rate}</Text>
                <Text style={[RowStyles.change, changeStyle]}>{change}</Text>
            </View>

            <TouchableOpacity style={RowStyles.button}>
                <Text style={RowStyles.buttonText}>Book Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RateRow;
