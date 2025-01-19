import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import RowStyles from './row-styles';

interface IProps {
    item: {
        item: string;
        price: string;
        itemName: string;
        amount: number;
        percentage: number;
        id: string;
    };
}

const RateRow = ({ item }: IProps) => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    const handleOnPress = (id: string) => {
        navigation.navigate('place-new-purchase-orders', { id });
    };

    const amountColor = item.amount > 0 ? "green" : "red";

    return (
        <View style={RowStyles.container}>
            <Text style={RowStyles.itemText}>{item.itemName?.toString()}</Text>

            <View style={RowStyles.rateContainer}>
                <Text style={[RowStyles.price, { marginLeft: "30%" }]}>{`₹ ${item.price}`}</Text>
                <Text style={{ color: amountColor, fontSize: 12, marginTop: 6 }}>
                    {item.amount} ({item.percentage})
                </Text>
            </View>

            <TouchableOpacity style={RowStyles.button} onPress={() => handleOnPress(item.id)}>
                <Text style={RowStyles.buttonText}>Book Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RateRow;
