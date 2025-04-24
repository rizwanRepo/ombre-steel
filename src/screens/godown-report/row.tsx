import React from 'react';
import { View, Text } from 'react-native';

import Row from './row-style';

interface IProps {
    godownName: string;
    quantity: string;
}

const GodownReportRow = ({ godownName, quantity }: IProps) => (
    <View style={Row.container}>
        <Text style={Row.godownName}>{godownName}</Text>
        <Text style={Row.quantity}>{quantity}</Text>
    </View>
);

export default GodownReportRow;
