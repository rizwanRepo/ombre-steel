import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextStyle, ViewStyle } from 'react-native';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons';
import { MultiSelect } from 'react-native-element-dropdown';

import styles from "./styles";

export interface DropdownOption {
  label: string;
  value: string;
  id: number;
}

interface IProps {
  placeholder: string;
  options: DropdownOption[];
  value: any;
  onChange: (item: DropdownOption[]) => void;
  isDisable?: boolean;
  search?: boolean;
  containerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle | any;
  placeholderStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
}

const MultiSelectDropdown = ({
  placeholder,
  options,
  // value,
  onChange,
  isDisable,
  // containerStyle,
  dropdownStyle,
  placeholderStyle,
  search = false
}: IProps) => {
  const [selected, setSelected] = useState<DropdownOption[]>([]);

  const renderItem = (item: DropdownOption) => {
    return (
      <View style={styles.itemStyle}>
        <Text style={{ fontSize: 14 }}>{item.label}</Text>
      </View>
    );
  };

  const handleSelectionChange = (selectedValues: string[]) => {
    const previousSelectedValues = selected.map(item => item.value);
    const newSelected = selectedValues.filter(value => !previousSelectedValues.includes(value));
    const deselected = previousSelectedValues.filter(value => !selectedValues.includes(value));

    const updatedSelected = [
      ...selected.filter(item => !deselected.includes(item.value)),
      ...options.filter(option => newSelected.includes(option.value))
    ];

    setSelected(updatedSelected);
    onChange(updatedSelected);
  };

  return (
    <MultiSelect
      style={[styles.dropdown, dropdownStyle, isDisable && styles.disabledInput]}
      placeholderStyle={[styles.placeholderStyle, placeholderStyle, selected.length > 0 && { color: "#333" }]}
      selectedTextStyle={[styles.selectedTextStyle]}
      data={options}
      maxHeight={250}
      labelField="label"
      valueField="value"
      search={search}
      searchPlaceholder="Search..."
      placeholder={selected.length === 0 ? placeholder : `${selected.length} godown selected`}
      value={selected.map((item) => item.value)}
      disable={isDisable}
      onChange={handleSelectionChange}
      renderRightIcon={() => (
        <ArrowIcon
          name="arrow-drop-down"
          size={24}
          style={styles.icon}
        />
      )}
      activeColor={"#e0e0e0"}
      visibleSelectedItem={false}
      renderItem={renderItem}
    />
  );
};

export default MultiSelectDropdown;
