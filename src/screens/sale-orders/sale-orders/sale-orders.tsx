import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    Text,
    View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import styles from "./styles";
import Header from "../../../components/header/header";
import { useRefresh } from "../../../hooks/useRefresh";
import { SaleOrderService } from "../../../services/sale-orders-service";
import CustomButton from "../../../components/custom-button/custom-button";
import LoadingIndicator from "../../../components/loading-indicator/loading-indicator";
import EmptyListMessage from "../../../components/empty-list-message/empty-list-message";

const SaleOrders = () => {
    const saleOrderService = new SaleOrderService();
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    const { data: saleOrders, isLoading, refetch } = useQuery({
        queryKey: ["get-sale-orders"],
        queryFn: () => saleOrderService.getAll(),
    });

    const { isRefreshing, onRefresh } = useRefresh(refetch);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    const handleOnPress = () => navigation.navigate("add-today-sale-orders");

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Header
                title="Today`s Sale"
                iconLibrary="MaterialCommunityIcons"
                iconName="sale"
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

            <View style={{ marginHorizontal: 50, marginTop: 10 }}>
                <CustomButton
                    onPress={handleOnPress}
                    title="Add Today`s Sale"
                    textStyle={styles.textStyle}
                    style={styles.addButton}
                />
            </View>

        </KeyboardAvoidingView>
    );
};

export default SaleOrders;
