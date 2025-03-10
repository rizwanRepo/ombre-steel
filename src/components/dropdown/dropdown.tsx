import React from "react";
import { View, Text } from "react-native";
import { TextStyle, ViewStyle } from 'react-native';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown as RNE_Dropdown } from 'react-native-element-dropdown';

import styles from "./styles";

export interface DropdownOption {
    label: string;
    value: string;
    id: number;
}

interface IProps {
    placeholder: string;
    options: DropdownOption[];
    value: string;
    onChange: (item: DropdownOption) => void;
    isDisable?: boolean;
    search?: boolean;
    containerStyle?: ViewStyle;
    dropdownStyle?: ViewStyle | any;
    placeholderStyle?: TextStyle;
    selectedTextStyle?: TextStyle;
}

const Dropdown = ({
    placeholder,
    options,
    value,
    onChange,
    isDisable,
    containerStyle,
    dropdownStyle,
    placeholderStyle,
    selectedTextStyle,
    search = false
}: IProps) => {

    const renderItem = (item: DropdownOption) => {
        return (
            <View style={styles.itemStyle}>
                <Text style={{ fontSize: 14 }}>{item.label}</Text>
            </View>
        );
    };

    return (
        <RNE_Dropdown
            style={[styles.dropdown, dropdownStyle, isDisable && styles.disabledRateInput]}
            placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
            selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
            data={options}
            maxHeight={250}
            labelField="label"
            valueField="value"
            search={search}
            searchPlaceholder="Search..."
            placeholder={placeholder}
            value={value}
            disable={isDisable}
            onChange={(item) => onChange(item)}
            renderRightIcon={() => (
                <ArrowIcon
                    name="arrow-drop-down"
                    size={24}
                    style={styles.icon}
                />
            )}
            renderItem={renderItem}
            containerStyle={containerStyle}
        />
    );
};

export default Dropdown;
