import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
} from 'react-native';

import RowListView from './row-items';
import OrderListViewStyles from './order-list-view-styles';
import { PurchaseOrderService } from '../../../services/purchase-order-service';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';
import CustomButton from '../../../components/custom-button/custom-button';
import { useRefresh } from '../../../hooks/useRefresh';
import { PURCHASE_ORDERS_STATUS } from '../../../constants';
import Header from '../../../components/header/header';
import EmptyListMessage from '../../../components/empty-list-message/empty-list-message';

const OrderListView = () => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const purchaseOrderService = new PurchaseOrderService();

    const { data: purchaseOrders, isFetching, refetch } = useQuery({
        queryKey: ["get-purchase-orders"],
        queryFn: () => purchaseOrderService.getAll(),
    });

    const { isRefreshing, onRefresh } = useRefresh(refetch);

    const handleOnPress = () => navigation.navigate("place-new-purchase-orders");

    if (isFetching) {
        return <LoadingIndicator />;
    }

    return (
        <KeyboardAvoidingView
            style={OrderListViewStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Header
                title="Purchase Orders"
                iconLibrary="MaterialCommunityIcons"
                iconName="baby-carriage"
            />

            <View style={OrderListViewStyles.headerRow}>
                <View style={OrderListViewStyles.headerCellItem}>
                    <Text style={OrderListViewStyles.headerText}>Grade</Text>
                </View>
                <View style={OrderListViewStyles.headerCellQuantity}>
                    <Text style={OrderListViewStyles.headerText}>Quantity</Text>
                </View>
                <View style={OrderListViewStyles.headerCellStatus}>
                    <Text style={OrderListViewStyles.headerText}>Status</Text>
                </View>
            </View>

            <FlatList
                data={purchaseOrders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <RowListView
                        orderId={item.orderNo}
                        item={`${item.grade}`}
                        quantity={`${item.totalQty} ${item.primaryUnit}`}
                        status={item.status}
                    />
                )}
                ListEmptyComponent={<EmptyListMessage title=" No purchase orders available." />}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
            />

            {purchaseOrders.length > 0 && (
                <View style={OrderListViewStyles.colorsContainer}>
                    <View style={OrderListViewStyles.colorsRow}>
                        {PURCHASE_ORDERS_STATUS.map((color) => (
                            <View key={color.name} style={OrderListViewStyles.colorItem}>
                                <View
                                    style={[
                                        OrderListViewStyles.colorCircle,
                                        { backgroundColor: color.hex },
                                    ]}
                                />
                                <Text
                                    style={[
                                        OrderListViewStyles.colorName,
                                        { color: color.hex },
                                    ]}
                                >
                                    {color.name}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            <View style={{ marginHorizontal: 50 }}>
                <CustomButton
                    onPress={handleOnPress}
                    title="Place New Purchase Order"
                    textStyle={OrderListViewStyles.textStyle}
                    style={OrderListViewStyles.addButton}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

export default OrderListView;
