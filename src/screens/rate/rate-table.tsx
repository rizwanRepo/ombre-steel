import React from 'react';
import {
    View,
    Text,
    FlatList,
    ImageBackground,
} from 'react-native';
import Icon from "react-native-vector-icons/Fontisto";

import RateRow from './rate-row';
import TableStyles from './table-styles';
import { getFormattedDate, RATES_DATA } from '../../constants';

const RateTable = () => (
    <ImageBackground
        source={require('../../assets/images/bg-image.png')}
        resizeMode="contain"
        style={TableStyles.image}
    >
        <View style={TableStyles.container}>
            <View style={TableStyles.titleContainer}>
                <Icon name="money-symbol" size={20} color="#333" />
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={TableStyles.title}>Rates </Text>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>{getFormattedDate()}</Text>
                </View>
            </View>

            <View style={TableStyles.headerRow}>
                <Text style={TableStyles.headerText}>Items</Text>
                <Text style={TableStyles.headerText}>Rate</Text>
                <Text style={[TableStyles.headerText]}>Action</Text>
            </View>

            <FlatList
                data={RATES_DATA}
                keyExtractor={(item) => item.item}
                renderItem={({ item }) => <RateRow item={item} />}
            />
        </View>
    </ImageBackground>
);

export default RateTable;
