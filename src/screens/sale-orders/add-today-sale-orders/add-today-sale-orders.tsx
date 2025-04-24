import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    RefreshControl,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import styles from "./styles";
// import Header from "../../../components/header/header";
import { useUser } from "../../../context/user-context";
import Dropdown, { DropdownOption } from "../../../components/dropdown/dropdown";
import { SaleOrderService } from "../../../services/sale-orders-service";
import { InventoryService } from "../../../services/inventory-service";
import CustomButton from "../../../components/custom-button/custom-button";
import { GRADE_LIST, ITEM_TYPES } from "../../../constants";

const AddTodaySaleOrders = ({ route }: any) => {
    const { user } = useUser();
    const { orderId } = route.params;
    const inventoryService = new InventoryService();
    const todaySaleOrderService = new SaleOrderService();
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    const { control, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            items: [
                {
                    item_name: "",
                    total_quantity: "",
                    sale_quantity: "",
                    item_id: "",
                    item_type: "",
                    grade: ""
                }],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "items" });

    const { mutate: onSave, isPending } = useMutation({
        mutationFn: (data) => todaySaleOrderService.create(data),
        onSuccess: () => {
            navigation.navigate("/");
        },
        onError: () => { },
    });

    const { mutate: onUpdate, isPending: isUpdating } = useMutation({
        mutationFn: (data) => todaySaleOrderService.update(user?.partyId, data),
        onSuccess: () => {
            navigation.navigate("sale-orders");
        },
        onError: () => { },
    });

    const { data: saleOrder } = useQuery({
        queryKey: ["get-sale-order", orderId],
        queryFn: () => todaySaleOrderService.getOne(orderId),
        enabled: !!orderId
    });

    const { data: inventories, isFetching, refetch } = useQuery({
        queryKey: ["get-inventories"],
        queryFn: () => inventoryService.getAll(),
    });

    useEffect(() => {
        if (saleOrder && orderId) {
            const index = 0;
            setValue(`items.${index}.item_name`, saleOrder.Item.name);
            setValue(`items.${index}.item_type`, saleOrder.itemType);
            setValue(`items.${index}.grade`, saleOrder.Item.grade);
            setValue(`items.${index}.sale_quantity`, saleOrder.quantity?.toString());
            setValue(`items.${index}.total_quantity`, saleOrder.totalQty?.toString());
            setValue(`items.${index}.item_id`, saleOrder.itemId);
        }
    }, [saleOrder, orderId]);

    const items = useWatch({ control, name: "items" });

    const isSubmitDisabled = items.some(
        (item) => !item.item_name || !item.sale_quantity
    );

    const onSubmit = async () => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-CA");

        const items = getValues("items") || [];

        const filteredData = items.map(
            ({ item_id, sale_quantity, item_type, grade }: { item_id: string; sale_quantity: string, item_type: string, grade: string }) =>
            ({
                itemId: item_id,
                itemType: item_type,
                grade,
                quantity: Number(sale_quantity),
                ...(orderId && { id: orderId })
            }));

        const saleOrderData: any = {
            date: formattedDate,
            items: filteredData,
        };
        await orderId ? onUpdate(saleOrderData) : onSave(saleOrderData);
    };

    const handleDropdownChange = (newValue: any, index: number) => {
        setValue(`items.${index}.item_name`, newValue.label);
        setValue(`items.${index}.item_id`, newValue.id);
        const selectedItem = inventories?.find((item: { itemId: string }) => item.itemId === newValue.id);
        if (selectedItem) {
            setValue(`items.${index}.total_quantity`, selectedItem.quantity.toString());
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.container}>
                {/* <Header
                    title={`${orderId ? "Edit" : "Add"} Sale Order`}
                    iconLibrary="MaterialCommunityIcons"
                    iconName="sale"
                /> */}

                <FlatList
                    data={fields}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    alwaysBounceVertical
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: 200 }}
                    renderItem={({ item, index }) => (
                        <View style={styles.card} key={index}>
                            <View style={styles.firstRow}>
                                <View style={{ flex: 1, marginRight: 8 }}>
                                    <Text style={{ fontSize: 14, color: "#333" }}>Grade</Text>
                                    <Controller
                                        control={control}
                                        name={`items.${index}.grade`}
                                        render={({ field: { value, onChange } }) => (
                                            <Dropdown
                                                placeholder="Grade"
                                                options={GRADE_LIST}
                                                value={value}
                                                onChange={(value) => onChange(value.value)}
                                                dropdownStyle={[orderId && styles.disabledRateInput, { height: 50 }]}
                                                isDisable={orderId}
                                            />
                                        )}
                                    />
                                </View>

                                <View style={{ flex: 1, marginRight: 8 }}>
                                    <Text style={{ fontSize: 14, color: "#333" }}>Item Type</Text>
                                    <Controller
                                        control={control}
                                        name={`items.${index}.item_type`}
                                        render={({ field: { value, onChange } }) => (
                                            <Dropdown
                                                placeholder="Item Type"
                                                options={ITEM_TYPES}
                                                value={value}
                                                isDisable={orderId}
                                                // isDisable={!getValues(`items.${index}.grade`)}
                                                onChange={(value) => onChange(value.value)}
                                                dropdownStyle={[orderId && styles.disabledRateInput, { height: 50 }]}
                                            />
                                        )}
                                    />
                                </View>
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <View style={{ flex: 1, marginRight: 8 }}>
                                    <Text style={{ fontSize: 14, color: "#333" }}>Item Name</Text>
                                    <Controller
                                        control={control}
                                        name={`items.${index}.item_name`}
                                        render={({ field: { value } }) => (
                                            <Dropdown
                                                placeholder="Item Name"
                                                search={true}
                                                options={inventories?.map((item: any) => ({
                                                    label: item.itemName,
                                                    id: item.itemId,
                                                    value: item.itemName
                                                })) || []}
                                                value={value}
                                                isDisable={orderId}
                                                onChange={(newValue: DropdownOption) => handleDropdownChange(newValue, index)}
                                                dropdownStyle={[orderId && styles.disabledRateInput, { height: 50 }]}
                                            // isDisable={!getValues(`items.${index}.grade`) || !getValues(`items.${index}.item_type`)}
                                            />
                                        )}
                                    />
                                </View>
                            </View>

                            <View style={styles.secondRow}>
                                <View style={{ width: "47%", marginRight: 8 }}>
                                    <Text style={{ fontSize: 14, color: "#333" }}>Rate/(kg)</Text>
                                    <Controller
                                        control={control}
                                        name={`items.${index}.total_quantity`}
                                        render={({ field: { value } }) => (
                                            <TextInput
                                                style={[styles.input, styles.disabledRateInput]}
                                                placeholder="Rate"
                                                value={value ? `₹ ${value}` : ""}
                                                editable={false}
                                                placeholderTextColor="#aaa"
                                            />
                                        )}
                                    />
                                </View>

                                <View style={{ width: "47%", marginRight: 8 }}>
                                    <Text style={{ fontSize: 14, color: "#333" }}>Sale Quantity</Text>
                                    <Controller
                                        control={control}
                                        name={`items.${index}.sale_quantity`}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Sale quantity"
                                                keyboardType="numeric"
                                                value={value}
                                                onChangeText={onChange}
                                                placeholderTextColor="#aaa"
                                            />
                                        )}
                                    />
                                </View>

                                {fields.length > 1 && index < fields.length - 1 && (
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={() => remove(index)}
                                    >
                                        <Icon name="delete" size={18} color="red" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
                    }
                />

                {
                    !orderId && <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => append({ item_name: "", item_type: "", grade: "", total_quantity: "", sale_quantity: "", item_id: "" })}
                    >
                        <MaterialIcons name="add-circle" size={24} color="#fff" />
                        <Text style={styles.addButtonText}>Add Row</Text>
                    </TouchableOpacity>
                }

                <CustomButton
                    title={`${orderId ? "Update" : "Submit"}`}
                    isLoading={isPending || isUpdating}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isUpdating || isPending || isSubmitDisabled || !items.length}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

export default AddTodaySaleOrders;









// import React, { useEffect, useState } from "react";
// import {
//     View,
//     Text,
//     FlatList,
//     TouchableOpacity,
//     TextInput,
//     RefreshControl,
//     KeyboardAvoidingView,
//     Platform,
// } from "react-native";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
// import { NavigationProp, useNavigation } from "@react-navigation/native";

// import styles from "./styles";
// import Header from "../../../components/header/header";
// import { useUser } from "../../../context/user-context";
// import Dropdown, { DropdownOption } from "../../../components/dropdown/dropdown";
// import { SaleOrderService } from "../../../services/sale-orders-service";
// import { InventoryService } from "../../../services/inventory-service";
// import CustomButton from "../../../components/custom-button/custom-button";

// const AddTodaySaleOrders = ({ route }: any) => {
//     const { user } = useUser();
//     const { orderId } = route.params;
//     const inventoryService = new InventoryService();
//     const todaySaleOrderService = new SaleOrderService();
//     const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

//     const { control, handleSubmit, setValue, getValues } = useForm({
//         defaultValues: {
//             items: [{ item_name: "", total_quantity: "", sale_quantity: "", item_id: "" }],
//         },
//     });

//     const { fields, append, remove } = useFieldArray({ control, name: "items" });
//     const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

//     const { mutate: onSave, isPending } = useMutation({
//         mutationFn: (data) => todaySaleOrderService.create(data),
//         onSuccess: () => {
//             navigation.navigate("/");
//         },
//         onError: () => { },
//     });

//     const { mutate: onUpdate, isPending: isUpdating } = useMutation({
//         mutationFn: (data) => todaySaleOrderService.update(user?.partyId, data),
//         onSuccess: () => {
//             navigation.navigate("sale-orders");
//         },
//         onError: () => { },
//     });

//     const { data: saleOrder } = useQuery({
//         queryKey: ["get-sale-order", orderId],
//         queryFn: () => todaySaleOrderService.getOne(orderId),
//         enabled: !!orderId
//     });

//     const { data: inventories, isFetching, refetch } = useQuery({
//         queryKey: ["get-inventories"],
//         queryFn: () => inventoryService.getAll(),
//     });

//     useEffect(() => {
//         if (saleOrder && orderId) {
//             const index = 0;
//             setValue(`items.${index}.item_name`, saleOrder.Item.name);
//             setValue(`items.${index}.sale_quantity`, saleOrder.quantity.toString());
//             setValue(`items.${index}.total_quantity`, saleOrder.totalQty.toString());
//             setValue(`items.${index}.item_id`, saleOrder.itemId);
//         }
//     }, [saleOrder, orderId]);

//     const items = useWatch({ control, name: "items" });

//     const isSubmitDisabled = items.some(
//         (item) => !item.item_name || !item.sale_quantity
//     );

//     const onSubmit = async () => {
//         const date = new Date();
//         const formattedDate = date.toLocaleDateString("en-CA");

//         const items = getValues("items") || [];

//         const filteredData = items.map(
//             ({ item_id, sale_quantity }: { item_id: string; sale_quantity: string }) =>
//             ({
//                 itemId: item_id,
//                 quantity: Number(sale_quantity),
//                 ...(orderId && { id: orderId })
//             }));

//         const saleOrderData: any = {
//             date: formattedDate,
//             items: filteredData,
//         };
//         await orderId ? onUpdate(saleOrderData) : onSave(saleOrderData);
//     };

//     const handleDropdownChange = (newValue: any, index: number) => {
//         setValue(`items.${index}.item_name`, newValue.label);
//         setValue(`items.${index}.item_id`, newValue.id);
//         const selectedItem = inventories?.find((item: { itemId: string }) => item.itemId === newValue.id);
//         if (selectedItem) {
//             setValue(`items.${index}.total_quantity`, selectedItem.quantity.toString());
//         }
//     };

//     return (
//         <KeyboardAvoidingView
//             style={{ flex: 1 }}
//             behavior={Platform.OS === "ios" ? "padding" : undefined}
//         >
//             <View style={styles.container}>
//                 <Header
//                     title={`${orderId ? "Edit" : "Add"} Sale Order`}
//                     iconLibrary="MaterialCommunityIcons"
//                     iconName="sale"
//                 />
//                 <View style={styles.headerRow}>
//                     <Text style={styles.headerText}>Item Name</Text>
//                     <Text style={[styles.headerText, { marginLeft: "25%" }]}>Total Qty</Text>
//                     <Text style={[styles.headerText, { marginRight: "5%" }]}>Sale Qty</Text>
//                 </View>

//                 <FlatList
//                     data={fields}
//                     keyExtractor={(item, index) => item.id || index.toString()}
//                     alwaysBounceVertical
//                     keyboardShouldPersistTaps="handled"
//                     contentContainerStyle={{ paddingBottom: 200 }}
//                     renderItem={({ item, index }) => (
//                         <View style={styles.row} key={index}>
//                             <View style={{ width: "50%", marginRight: 8 }}>
//                                 <Controller
//                                     control={control}
//                                     name={`items.${index}.item_name`}
//                                     render={({ field: { value } }) => (
//                                         <Dropdown
//                                             placeholder="Select item"
//                                             options={inventories?.map((item: { itemName: string, itemId: string }) => ({
//                                                 label: item.itemName,
//                                                 id: item.itemId,
//                                                 value: item.itemName
//                                             })) || []}
//                                             value={value}
//                                             onChange={(newValue: DropdownOption) => handleDropdownChange(newValue, index)}
//                                         />
//                                     )}
//                                 />
//                             </View>

//                             <View style={{ width: "20%", marginRight: 8 }}>
//                                 <Controller
//                                     control={control}
//                                     name={`items.${index}.total_quantity`}
//                                     render={({ field: { value } }) => (
//                                         <TextInput
//                                             style={[styles.input]}
//                                             placeholder="T-Qty"
//                                             value={value || ""}
//                                             editable={false}
//                                             placeholderTextColor="#aaa"
//                                         />
//                                     )}
//                                 />
//                             </View>

//                             <View style={{ width: `${orderId ? '25%' : '20%'}`, marginRight: 10 }}>
//                                 <Controller
//                                     control={control}
//                                     name={`items.${index}.sale_quantity`}
//                                     render={({ field: { onChange, value } }) => (
//                                         <TextInput
//                                             style={styles.input}
//                                             placeholder="S-Qty"
//                                             keyboardType="numeric"
//                                             value={value}
//                                             onChangeText={onChange}
//                                             placeholderTextColor="#aaa"
//                                         />
//                                     )}
//                                 />
//                             </View>

//                             {!orderId && <TouchableOpacity
//                                 style={styles.removeButton}
//                                 onPress={() => remove(index)}
//                             >
//                                 <Icon name="delete" size={18} color="red" />
//                             </TouchableOpacity>}
//                         </View>
//                     )}
//                     refreshControl={
//                         <RefreshControl refreshing={isFetching} onRefresh={refetch} />
//                     }
//                 />

//                 {
//                     !orderId && <TouchableOpacity
//                         style={styles.addButton}
//                         onPress={() => append({ item_name: "", total_quantity: "", sale_quantity: "", item_id: "" })}
//                     >
//                         <MaterialIcons name="add-circle" size={24} color="#fff" />
//                         <Text style={styles.addButtonText}>Add Row</Text>
//                     </TouchableOpacity>
//                 }

//                 <CustomButton
//                     title={`${orderId ? "Update" : "Submit"}`}
//                     isLoading={isPending || isUpdating}
//                     onPress={handleSubmit(onSubmit)}
//                     disabled={isUpdating || isPending || isSubmitDisabled || !items.length}
//                 />
//             </View>
//         </KeyboardAvoidingView>
//     );
// };

// export default AddTodaySaleOrders;
