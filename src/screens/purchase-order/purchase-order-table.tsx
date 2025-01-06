import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    View,
    Text,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

import TableStyles from './table-styles';
import SaleOrderRow from './purchase-order-row';
import { SALE_ORDER_DATA } from '../../constants';

const PurchaseOrderTable = () => (
    <KeyboardAvoidingView
        style={TableStyles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
        <ImageBackground
            source={require('../../assets/images/bg-image.png')}
            resizeMode="contain"
            style={TableStyles.image}
        >
            <View style={TableStyles.flex}>
                <View style={TableStyles.container}>

                    <TitleBar />

                    <HeaderRow />

                    <FlatList
                        data={SALE_ORDER_DATA}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <SaleOrderRow
                                item={item.item}
                                quantity={item.quantity}
                                status={item.status}
                            />
                        )}
                    />
                </View>
                <View style={TableStyles.fixedButtonContainer}>
                    <TouchableOpacity style={TableStyles.bottomButton}>
                        <Text style={TableStyles.buttonText}>Place new purchase order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    </KeyboardAvoidingView>
);

const TitleBar = () => (
    <View style={TableStyles.titleContainer}>
        <Icon name="sale" size={20} color="#333" />
        <Text style={TableStyles.title}>Purchase Orders</Text>
    </View>
);

const HeaderRow = () => (
    <View style={TableStyles.headerRow}>
        <View style={TableStyles.headerCellItem}>
            <Text style={TableStyles.headerText}>Items</Text>
        </View>
        <View style={TableStyles.headerCellQuantity}>
            <Text style={TableStyles.headerText}>Quantity</Text>
        </View>
        <View style={TableStyles.headerCellStatus}>
            <Text style={TableStyles.headerText}>Status</Text>
        </View>
    </View>
);

export default PurchaseOrderTable;
