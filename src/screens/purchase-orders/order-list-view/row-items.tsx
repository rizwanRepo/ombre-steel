import React from 'react';
import Icon from "react-native-vector-icons/Entypo";
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import RowListStyles from './row-items-styles';

interface IProps {
    item: string;
    orderId: number;
    quantity: string;
    status: "Completed" | "In Progress" | "Not Started";
}

const RowListView = ({ item, quantity, status, orderId }: IProps) => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    const handleViewPress = () => {
        navigation.navigate('purchase-order-detail', { orderId });
    };

    const getButtonStyle = () => {
        switch (status) {
            case 'Completed':
                return { backgroundColor: '#4bad4b' }; // Light Green
            case 'In Progress':
                return { backgroundColor: '#c8a86c' }; // Light Red
            case 'Not Started':
                return { backgroundColor: '#4A9ADF' }; // Light Yellow
            default:
                return { backgroundColor: '#4bad4b' }; // Default Light Green
        }
    };

    return (
        <View style={RowListStyles.container}>
            <View style={RowListStyles.itemContainer}>
                <Text style={RowListStyles.item}>{item}</Text>
            </View>

            <View style={RowListStyles.quantityContainer}>
                <Text style={RowListStyles.quantity}>{quantity}</Text>
            </View>

            <View style={RowListStyles.statusContainer}>
                <View
                    style={[
                        RowListStyles.statusIconContainer,
                        getButtonStyle(),
                    ]}
                >
                    <Icon
                        name={"circle"}
                        size={25}
                        color="#fff"
                    />
                </View>
            </View>

            <View style={RowListStyles.viewContainer}>
                <TouchableOpacity
                    style={RowListStyles.iconContainer}
                    onPress={handleViewPress}
                >
                    <Icon
                        name={"eye"}
                        size={20}
                        color="#aaa"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RowListView;
