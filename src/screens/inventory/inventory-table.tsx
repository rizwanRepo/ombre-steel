import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import {
    View,
    Text,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
} from 'react-native';

import TableStyles from './table-styles';
import InventoryRow from './inventory-row';
import { INVENTORY_DATA } from '../../constants';

const InventoryTable = () => (
    <KeyboardAvoidingView
        style={TableStyles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
        <ImageBackground
            source={require('../../assets/images/bg-image.png')}
            resizeMode="contain"
            style={TableStyles.image}
        >
            <View style={TableStyles.container}>

                <TitleBar />

                <HeaderRow />

                <FlatList
                    data={INVENTORY_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <InventoryRow item={item.item} quantity={item.quantity} />
                    )}
                />
            </View>
        </ImageBackground>
    </KeyboardAvoidingView>
);

const TitleBar = () => (
    <View style={TableStyles.titleContainer}>
        <Icon name="inventory" size={20} color="#333" />
        <Text style={TableStyles.title}>Inventory</Text>
    </View>
);

const HeaderRow = () => (
    <View style={TableStyles.headerRow}>
        <Text style={TableStyles.headerText}>Items</Text>
        <Text style={TableStyles.headerText}>Quantity</Text>
    </View>
);

export default InventoryTable;
