import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    View,
    Text,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
} from "react-native";

import TableStyles from "./table-styles";
import InventoryRow from "./inventory-row";
import Header from "../../components/header/header";
import { useRefresh } from "../../hooks/use-refresh";
import { InventoryService } from "../../services/inventory-service";
import LoadingIndicator from "../../components/loading-indicator/loading-indicator";
import EmptyListMessage from "../../components/empty-list-message/empty-list-message";

const InventoryTable = () => {
    const inventoryService = new InventoryService();

    const { data: inventories, isFetching, refetch } = useQuery({
        queryKey: ["get-inventories"],
        queryFn: () => inventoryService.getAll(),
    });

    const { isRefreshing, onRefresh } = useRefresh(refetch);

    if (isFetching) {
        return <LoadingIndicator />;
    }

    return (
        <KeyboardAvoidingView
            style={TableStyles.flex}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={TableStyles.container}>
                <Header
                    title="Inventory"
                    iconLibrary="MaterialIcons"
                    iconName="inventory"
                />

                <View style={TableStyles.headerRow}>
                    <View style={TableStyles.headerCellItem}>
                        <Text style={TableStyles.headerText}>Item Name</Text>
                    </View>
                    <View style={TableStyles.headerCellQuantity}>
                        <Text style={TableStyles.headerText}>Quantity</Text>
                    </View>
                </View>

                <FlatList
                    data={inventories}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <InventoryRow
                            itemName={item.itemName}
                            quantity={item.quantity}
                            unit={item.unit}
                        />
                    )}
                    ListEmptyComponent={<EmptyListMessage title="No inventory available." />}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </KeyboardAvoidingView>
    );
};

export default InventoryTable;
