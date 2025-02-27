import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import styles from "./styles";
import Header from "../../../components/header/header";
import { useRefresh } from "../../../hooks/use-refresh";
import useDatePicker from "../../../hooks/use-date-picker";
import { SaleOrderService } from "../../../services/sale-orders-service";
import CustomButton from "../../../components/custom-button/custom-button";
import LoadingIndicator from "../../../components/loading-indicator/loading-indicator";
import EmptyListMessage from "../../../components/empty-list-message/empty-list-message";

const SaleOrders = () => {
    const saleOrderService = new SaleOrderService();
    const { selectedDate, onSelect } = useDatePicker();
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    const { data: saleOrders, isFetching, refetch } = useQuery({
        queryKey: ["get-sale-orders", selectedDate],
        queryFn: () => saleOrderService.getAll(selectedDate, selectedDate),
    });

    const { isRefreshing, onRefresh } = useRefresh(refetch);

    if (isFetching) {
        return <LoadingIndicator />;
    }

    const handleOnPress = (orderId?: string) => navigation.navigate('add-today-sale-orders', { orderId });

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Header
                title="Sale"
                iconLibrary="MaterialCommunityIcons"
                iconName="sale"
                isCalender={true}
                updateDate={onSelect}
                currentDate={selectedDate}
            />

            <View style={styles.headerRow}>
                <View style={styles.headerCellItem}>
                    <Text style={styles.headerText}>Item Name</Text>
                </View>
                <View style={styles.headerCellQuantity}>
                    <Text style={styles.headerText}>Quantity</Text>
                </View>
            </View>

            <FlatList
                data={saleOrders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text style={styles.itemName}>{item.Item.name}</Text>
                        <Text style={styles.quantity}>
                            {item.quantity} {item.Item.primaryUnit}
                        </Text>
                        <TouchableOpacity
                            style={styles.editIconContainer}
                            onPress={() => handleOnPress(item.id)}
                        >
                            <Icon name="edit" size={20} color="#333" />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<EmptyListMessage title="No sale order available." />}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
            />

            <View style={styles.addButtonContainer}>
                <CustomButton
                    onPress={() => handleOnPress()}
                    title="Add Sale"
                    textStyle={styles.textStyle}
                    style={styles.addButton}
                />
            </View>

        </KeyboardAvoidingView>
    );
};

export default SaleOrders;
