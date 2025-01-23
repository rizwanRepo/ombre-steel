import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    RefreshControl,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NavigationProp, useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import styles from "./styles";
import { useUser } from "../../../context/user-context";
import Dropdown from "../../../components/dropdown/dropdown";
import { ItemRatesService } from "../../../services/item-rate-service";
import { LatestOrderNoService } from "../../../services/latest-order-no";
import CustomButton from "../../../components/custom-button/custom-button";
import { PlaceNewPurchaseOrderService } from "../../../services/place-new-purchase-order-service";
import Header from "../../../components/header/header";
import LoadingIndicator from "../../../components/loading-indicator/loading-indicator";

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

    const [openDropdown, setOpenDropdown] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const { mutate: onSave, isPending } = useMutation({
        mutationFn: (data) => placeNewPurchaseOrderService.create(data),
        onSuccess: () => {
            navigation.navigate("purchase-orders");
        },
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
            totalQty: "",
            rate: "",
        },
    });

    const gradeValue = watch("grade");
    const totalQtyValue = watch("totalQty");

    useEffect(() => {
        const { id } = route.params || {};
        if (id && grades) {
            const selectedGrade = grades.find((item: { id: string }) => item.id === id);
            if (selectedGrade) {
                setSelectedItem(selectedGrade.itemName);
                setValue("grade", selectedGrade.itemName);
                setValue("rate", selectedGrade.price.toString());
            }
        }
    }, [route.params, grades, setValue]);

    useEffect(() => {
        if (selectedItem) {
            const selectedGrade = grades?.find((item: any) => item.itemName === selectedItem);
            if (selectedGrade) {
                setSelectedItem(selectedGrade);
                setValue("rate", selectedGrade.price.toString());
            }
        }
    }, [selectedItem, grades, setValue]);

    const onSubmit = async (data: any) => {
        const date = new Date(new Date());
        const formattedDate = date.toLocaleDateString("en-CA");

        const updatedData = {
            ...data,
            primaryUnit: selectedItem?.unit,
            partyId: user?.partyId,
            date: formattedDate,
            orderNo: latestOrderNo,
        };
        await onSave(updatedData);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        setOpenDropdown(false);
    };

    if (isFetching || isLoading) {
        return <LoadingIndicator />;
    }

    const isSubmitDisabled = !gradeValue || !totalQtyValue;

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Header
                    title="Place new purchase order"
                    iconLibrary="MaterialCommunityIcons"
                    iconName="baby-carriage"
                />

                <FlatList
                    data={[1]}
                    keyExtractor={() => "key"}
                    refreshControl={
                        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
                    }
                    contentContainerStyle={{ flexGrow: 1 }}
                    renderItem={() => (
                        <>
                            <View style={styles.headerRow}>
                                <View style={styles.headerCellItem}>
                                    <Text style={styles.headerText}>Grade</Text>
                                </View>
                                <View style={styles.headerCellRate}>
                                    <Text style={styles.headerText}>Rate / Kg</Text>
                                </View>
                                <View style={styles.headerCellQuantity}>
                                    <Text style={styles.headerText}>Quantity</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={{ width: "32%" }}>
                                    <Controller
                                        control={control}
                                        name="grade"
                                        render={({ field: { onChange, value } }) => (
                                            <Dropdown
                                                placeholder="Grade"
                                                options={grades?.map((item: any) => item.itemName) || []}
                                                value={value}
                                                onChange={(newValue: any) => {
                                                    onChange(newValue);
                                                    setSelectedItem(newValue);
                                                }}
                                                isEnable={false}
                                                isDropdownVisible={openDropdown}
                                                toggleDropdown={() => setOpenDropdown(!openDropdown)}
                                                closeDropdown={() => setOpenDropdown(false)}
                                            />
                                        )}
                                    />
                                </View>

                                <View style={{ width: "30%", marginHorizontal: 10 }}>
                                    <Controller
                                        control={control}
                                        name="rate"
                                        render={({ field: { value } }) => (
                                            <TextInput
                                                style={[
                                                    styles.input,
                                                    value ? styles.disabledRateInput : styles.rateInput,
                                                ]}
                                                placeholder="Rate"
                                                keyboardType="numeric"
                                                value={value ? `₹ ${value}` : ""}
                                                editable={false}
                                                placeholderTextColor="#aaa"
                                            />
                                        )}
                                    />
                                </View>

                                <View style={{ width: "30%" }}>
                                    <Controller
                                        control={control}
                                        name="totalQty"
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Kg"
                                                keyboardType="numeric"
                                                value={value}
                                                onChangeText={onChange}
                                                placeholderTextColor="#aaa"
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </>
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
        </TouchableWithoutFeedback>
    );
};

export default PlaceNewPurchaseOrders;
