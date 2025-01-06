import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";

const Dropdown = ({
    placeholder,
    options,
    value,
    onChange,
    isDropdownVisible,
    toggleDropdown,
    closeDropdown,
    isEnable = true,
}: any) => {
    const [searchText, setSearchText] = useState("");

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                <Text
                    style={[
                        styles.dropdownText,
                        value === "" ? styles.placeholderText : styles.selectedText,
                    ]}
                >
                    {value || placeholder}
                </Text>
                <Icon name={isDropdownVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={20} />
            </TouchableOpacity>

            {isDropdownVisible && (
                <View style={styles.dropdownList}>
                    {isEnable && (
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search here..."
                            placeholderTextColor="rgba(0, 0, 0, 0.2)"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    )}
                    <FlatList
                        data={options.filter((option: any) =>
                            option.toLowerCase().includes(searchText.toLowerCase())
                        )}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                onPress={() => {
                                    onChange(item);
                                    closeDropdown();
                                    setSearchText("");
                                }}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

export default Dropdown;
