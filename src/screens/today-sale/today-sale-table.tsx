import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import styles from "./styles";
import Dropdown from "../../components/dropdown/dropdown";

const itemOptions = [
    "Ombre Steel",
    "Jindal Steel",
    "Bokaro Steel Plant",
    "Tata Steel",
    "Birla Steel",
    "JSW Steel",
];

const quantityOptions = ["Kilogram", "Pieces"];

export default function SearchableDropdownForm() {
    const { control, handleSubmit } = useForm({
        defaultValues: { items: [{ item: "", quantity: "" }] },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "items" });
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        setOpenDropdownIndex(null);
    };

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Icon name="inventory" size={20} color="#333" />
                    <Text style={styles.title}>Today`s Sales</Text>
                </View>

                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Items</Text>
                    <Text style={[styles.headerText]}>Quantity</Text>
                </View>

                <FlatList
                    data={fields}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.row}>
                            <View style={{ width: "55%", marginRight: 10 }}>
                                <Controller
                                    control={control}
                                    name={`items.${index}.item`}
                                    render={({ field: { onChange, value } }) => (
                                        <Dropdown
                                            placeholder="Type item name"
                                            options={itemOptions}
                                            value={value}
                                            onChange={onChange}
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

                            <Controller
                                control={control}
                                name={`items.${index}.quantity`}
                                render={({ field: { onChange, value } }) => (
                                    <Dropdown
                                        placeholder="Quantity"
                                        options={quantityOptions}
                                        value={value}
                                        isEnable={false}
                                        onChange={onChange}
                                        isDropdownVisible={openDropdownIndex === index + fields.length}
                                        toggleDropdown={() =>
                                            setOpenDropdownIndex(
                                                openDropdownIndex === index + fields.length
                                                    ? null
                                                    : index + fields.length
                                            )
                                        }
                                        closeDropdown={() => setOpenDropdownIndex(null)}
                                    />
                                )}
                            />

                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => remove(index)}
                            >
                                <Icon name="delete" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => append({ item: "", quantity: "" })}
                >
                    <Icon name="add-circle" size={24} color="#fff" />
                    <Text style={styles.addButtonText}>Add Row</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}
