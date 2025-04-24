import React, { useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    RefreshControl,
    StyleSheet,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NavigationProp, useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import { useUser } from "../../../context/user-context";
import Header from "../../../components/header/header";
import { GRADE_LIST, ITEM_TYPES } from "../../../constants";
import Dropdown from "../../../components/dropdown/dropdown";
import { ItemRatesService } from "../../../services/item-rate-service";
import { LatestOrderNoService } from "../../../services/latest-order-no";
import CustomButton from "../../../components/custom-button/custom-button";
import LoadingIndicator from "../../../components/loading-indicator/loading-indicator";
import { PlaceNewPurchaseOrderService } from "../../../services/place-new-purchase-order-service";

interface IParams {
    id?: string;
}

const PlaceNewPurchaseOrders = () => {
    const { user } = useUser();
    const route = useRoute<RouteProp<Record<string, IParams>, string>>();
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    const itemRatesService = new ItemRatesService();
    const latestOrderNoService = new LatestOrderNoService();
    const placeNewPurchaseOrderService = new PlaceNewPurchaseOrderService();

    const { mutate: onSave, isPending } = useMutation({
        mutationFn: (data) => placeNewPurchaseOrderService.create(data),
        onSuccess: () => {
            navigation.navigate("purchase-orders");
        },
        onError: () => { }
    });

    const { data: grades, isFetching: isLoading } = useQuery({
        queryKey: ["get-item-rates"],
        queryFn: () => itemRatesService.getAll(),
    });

    const { data: latestOrderNo, isFetching, refetch } = useQuery({
        queryKey: ["get-latest-order-no"],
        queryFn: () => latestOrderNoService.get(),
    });

    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            grade: "",
            itemType: "",
            totalQty: "",
            rate: "",
        },
    });

    const gradeValue = watch("grade");
    const rateValue = watch("rate");
    const itemTypeValue = watch("itemType");
    const totalQtyValue = watch("totalQty");

    useEffect(() => {
        const { id } = route?.params || {};
        if (id && grades) {
            const selectedOption = grades?.find((item: { id: string }) => item.id === id);
            if (selectedOption) {
                setValue("grade", selectedOption.grade);
                setValue("itemType", selectedOption.itemName);
                setValue("rate", selectedOption.price.toString());
            }
        }
    }, [route.params, grades, setValue]);

    useEffect(() => {
        const selectedOption = grades?.find(
            (item: { grade: string, itemName: string }) => (
                item.grade === gradeValue && item.itemName === itemTypeValue
            ));
        if (selectedOption) {
            setValue("rate", selectedOption.price.toString());
        } else {
            setValue("rate", '');
        }
    }, [gradeValue, itemTypeValue]);

    const onSubmit = async (data: any) => {
        const date = new Date(new Date());
        const formattedDate = date.toLocaleDateString("en-CA");

        const updatedData = {
            ...data,
            primaryUnit: "KG",
            partyId: user?.partyId,
            date: formattedDate,
            orderNo: latestOrderNo,
        };
        await onSave(updatedData);
    };

    if (isFetching || isLoading) {
        return <LoadingIndicator />;
    }

    const isSubmitDisabled = !gradeValue || !totalQtyValue || !rateValue;

    return (
        <View style={styles.container}>
            {/* <Header
                title="Place new purchase order"
                iconLibrary="MaterialCommunityIcons"
                iconName="baby-carriage"
            /> */}

            <FlatList
                data={[1]}
                keyExtractor={() => "key"}
                refreshControl={
                    <RefreshControl refreshing={isFetching} onRefresh={refetch} />
                }
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={() => (
                    <View style={styles.cardContainer}>
                        <View style={styles.cardRow}>
                            <View style={styles.inputContainer}>
                                <Text style={{ fontSize: 14, color: "#333" }}>Grade</Text>
                                <Controller
                                    control={control}
                                    name="grade"
                                    render={({ field: { onChange, value } }: any) => (
                                        <Dropdown
                                            placeholder="Grade"
                                            value={value.value || gradeValue}
                                            onChange={(item) => onChange(item.value)}
                                            options={GRADE_LIST}
                                            isDisable={!!route?.params}
                                            dropdownStyle={[!!route?.params && styles.disabledRateInput, { height: 50 }]}
                                        />
                                    )}
                                />
                            </View>

                            <View style={[styles.inputContainer, { marginLeft: 10 }]}>
                                <Text style={{ fontSize: 14, color: "#333" }}>Item Type</Text>
                                <Controller
                                    control={control}
                                    name="itemType"
                                    render={({ field: { onChange, value } }: any) => (
                                        <Dropdown
                                            placeholder="Item Type"
                                            value={value.value || itemTypeValue}
                                            onChange={(item) => onChange(item.value)}
                                            options={ITEM_TYPES}
                                            isDisable={!!route?.params}
                                            dropdownStyle={[!!route?.params && styles.disabledRateInput, { height: 50 }]}
                                        />
                                    )}
                                />
                            </View>
                        </View>

                        <View style={styles.cardRow}>
                            <View style={styles.inputContainer}>
                                <Text style={{ fontSize: 14, color: "#333" }}>Rate/(kg)</Text>
                                <Controller
                                    control={control}
                                    name="rate"
                                    render={({ field: { value } }) => (
                                        <TextInput
                                            style={[styles.input, styles.disabledRateInput]}
                                            placeholder="Rate"
                                            keyboardType="numeric"
                                            value={value ? `₹ ${value}` : ""}
                                            editable={false}
                                            placeholderTextColor="#aaa"
                                        />
                                    )}
                                />
                            </View>

                            <View style={[styles.inputContainer, { marginLeft: 10 }]}>
                                <Text style={{ fontSize: 14, color: "#333" }}>Quantity</Text>
                                <Controller
                                    control={control}
                                    name="totalQty"
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Quantity"
                                            keyboardType="numeric"
                                            value={value}
                                            onChangeText={onChange}
                                            placeholderTextColor="#aaa"
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <CustomButton
                    title="Submit"
                    onPress={handleSubmit(onSubmit)}
                    isLoading={isPending}
                    disabled={isPending || isSubmitDisabled}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#f0f4f7',
    },
    cardContainer: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        margin: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },
    cardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    inputContainer: {
        flex: 1,
    },
    input: {
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingLeft: 10,
        fontSize: 14,
        backgroundColor: "#fff",
    },
    disabledRateInput: {
        backgroundColor: "#f1f1f1",
        color: "#333"
    },
    footer: {
        padding: 16,
    },
});

export default PlaceNewPurchaseOrders;
