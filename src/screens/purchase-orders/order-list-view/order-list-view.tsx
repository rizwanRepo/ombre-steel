import React, { useState } from 'react';
import moment from 'moment';
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
import useDatePicker from '../../../hooks/use-date-picker';
import { PurchaseOrderService } from '../../../services/purchase-order-service';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';
import CustomButton from '../../../components/custom-button/custom-button';
import { useRefresh } from '../../../hooks/use-refresh';
import { PURCHASE_ORDERS_STATUS } from '../../../constants';
// import Header from '../../../components/header/header';
import EmptyListMessage from '../../../components/empty-list-message/empty-list-message';
import { DateRangeFilter } from '../../../components/date-range-filter/date-range-filter';

const OrderListView = () => {
    // const { selectedDate, onSelect } = useDatePicker();
    const purchaseOrderService = new PurchaseOrderService();
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    const [dateFilter, setDateFilter] = useState<any>({
        fromDate: moment().startOf('month').format('YYYY-MM-DD'),
        toDate: moment().format('YYYY-MM-DD'),
        filterType: 'date'
    });

    const { fromDate, toDate } = dateFilter;
    const formattedFromDate = moment(fromDate).format('DD/MM/YYYY');
    const formattedToDate = moment(toDate).format('DD/MM/YYYY');

    const { data: purchaseOrders, isFetching, refetch } = useQuery({
        queryKey: ["get-purchase-orders", formattedFromDate, formattedToDate],
        queryFn: () => purchaseOrderService.getAll(formattedFromDate, formattedToDate),
        enabled: !!formattedFromDate && !!formattedToDate,
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
            {/* <Header
                title="Purchase Orders"
                iconLibrary="MaterialCommunityIcons"
                iconName="baby-carriage"
                isCalender={true}
                updateDate={onSelect}
                currentDate={selectedDate}
            /> */}

            <DateRangeFilter
                dateFilter={dateFilter}
                onFilterChange={setDateFilter}
                filterTypes={['date', 'month', 'quarter', 'halfYear', 'year']}
            />

            {purchaseOrders?.length > 0 &&
                <View style={OrderListViewStyles.headerRow}>
                    <View style={OrderListViewStyles.headerCellItem}>
                        <Text style={OrderListViewStyles.headerText}>Grade</Text>
                    </View>
                    <View style={OrderListViewStyles.headerCellQuantity}>
                        <Text style={OrderListViewStyles.headerText}>Item Type</Text>
                    </View>
                    <View style={OrderListViewStyles.headerCellQuantity}>
                        <Text style={OrderListViewStyles.headerText}>Quantity</Text>
                    </View>
                    <View style={OrderListViewStyles.headerCellStatus}>
                        <Text style={OrderListViewStyles.headerText}>Status</Text>
                    </View>
                </View>
            }

            <FlatList
                data={purchaseOrders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <RowListView
                            orderId={item.orderNo}
                            itemName={item.itemType}
                            item={`${item.grade}`}
                            quantity={`${item.totalQty} ${item.primaryUnit}`}
                            status={item.status}
                        />
                    </View>
                )}
                ListEmptyComponent={<EmptyListMessage title=" No purchase orders available." />}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                }
            />

            {purchaseOrders?.length > 0 && (
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
                    title="Place Order"
                    textStyle={OrderListViewStyles.textStyle}
                    style={OrderListViewStyles.addButton}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

export default OrderListView;
