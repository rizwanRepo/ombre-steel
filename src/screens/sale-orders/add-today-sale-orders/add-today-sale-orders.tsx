import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import styles from "./styles";
import Header from "../../../components/header/header";
import Dropdown from "../../../components/dropdown/dropdown";
import { SaleOrderService } from "../../../services/sale-orders-service";
import { InventoryService } from "../../../services/inventory-service";
import CustomButton from "../../../components/custom-button/custom-button";

const AddTodaySaleOrders = () => {
    const inventoryService = new InventoryService();
    const todaySaleOrderService = new SaleOrderService();
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    const { control, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            items: [{ item_name: "", total_quantity: "", sale_quantity: "", item_id: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "items" });
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

    const { mutate: onSave, isPending } = useMutation({
        mutationFn: (data) => todaySaleOrderService.create(data),
        onSuccess: () => {
            navigation.navigate("/");
        },
        onError: () => { },
    });

    const { data: inventories } = useQuery({
        queryKey: ["get-inventories"],
        queryFn: () => inventoryService.getAll(),
    });

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        setOpenDropdownIndex(null);
    };

    const items = useWatch({ control, name: "items" });

    const isSubmitDisabled = items.some(
        (item) => !item.item_name || !item.sale_quantity
    );

    const onSubmit = async () => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-CA");

        const items = getValues("items") || [];

        const filteredData = items.map(
            ({ item_id, sale_quantity }: { item_id: string; sale_quantity: string }) =>
            ({
                itemId: item_id,
                quantity: Number(sale_quantity),
            }));

        const todaySaleOrder: any = {
            date: formattedDate,
            items: filteredData,
        };
        await onSave(todaySaleOrder);
    };

    const handleDropdownChange = (newValue: string, index: number) => {
        const selectedItem = inventories?.find((item: { itemName: string }) => item.itemName === newValue);

        if (selectedItem) {
            setValue(`items.${index}.item_name`, newValue);
            setValue(`items.${index}.total_quantity`, selectedItem.quantity.toString());
            setValue(`items.${index}.item_id`, selectedItem.itemId);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Header
                    title="Add Today`s Sale"
                    iconLibrary="MaterialCommunityIcons"
                    iconName="sale"
                />
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Item Name</Text>
                    <Text style={[styles.headerText, { marginLeft: "25%" }]}>Total Qty</Text>
                    <Text style={[styles.headerText, { marginRight: "10%" }]}>Sale Qty</Text>
                </View>
                <FlatList
                    data={fields}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.row}>
                            <View style={{ width: "50%", marginRight: 8 }}>
                                <Controller
                                    control={control}
                                    name={`items.${index}.item_name`}
                                    render={({ field: { value } }) => (
                                        <Dropdown
                                            placeholder="Type item"
                                            options={inventories?.map((item: { itemName: string }) => item.itemName) || []}
                                            value={value}
                                            isEnable={false}
                                            onChange={(newValue: string) =>
                                                handleDropdownChange(newValue, index)
                                            }
                                            isDropdownVisible={openDropdownIndex === index}
                                            toggleDropdown={() =>
                                                setOpenDropdownIndex(
                                                    openDropdownIndex === index ? null : index
                                                )
                                            }
                                            closeDropdown={() => setOpenDropdownIndex(null)}
                                        />
                                    )}
                                />
                            </View>

                            <View style={{ width: "20%", marginRight: 8 }}>
                                <Controller
                                    control={control}
                                    name={`items.${index}.total_quantity`}
                                    render={({ field: { value } }) => (
                                        <TextInput
                                            style={[styles.input]}
                                            placeholder="T-Qty"
                                            value={value || ""}
                                            editable={false}
                                            placeholderTextColor="#aaa"
                                        />
                                    )}
                                />
                            </View>

                            <View style={{ width: "20%", marginRight: 10 }}>
                                <Controller
                                    control={control}
                                    name={`items.${index}.sale_quantity`}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            style={[styles.input]}
                                            placeholder="S-Qty"
                                            keyboardType="numeric"
                                            value={value}
                                            onChangeText={onChange}
                                            placeholderTextColor="#aaa"
                                        />
                                    )}
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => remove(index)}
                            >
                                <Icon name="delete" size={18} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => append({ item_name: "", total_quantity: "", sale_quantity: "", item_id: "" })}
                >
                    <MaterialIcons name="add-circle" size={24} color="#fff" />
                    <Text style={styles.addButtonText}>Add Row</Text>
                </TouchableOpacity>

                <CustomButton
                    title="Submit"
                    isLoading={isPending}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isPending || isSubmitDisabled || !items.length}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AddTodaySaleOrders;
