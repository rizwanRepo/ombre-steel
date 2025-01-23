import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";
import { getFormattedDate } from "../../constants";

interface IProps {
    onDateChange: any;
    selectedDate: string | undefined;
}

const DatePicker = ({ onDateChange, selectedDate }: IProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const showDatePicker = () => {
        setIsVisible(true);
    };

    const hideDatePicker = () => {
        setIsVisible(false);
    };

    const handleConfirm = (date: Date) => {
        const formattedDate = getFormattedDate(date);
        onDateChange(formattedDate);
        hideDatePicker();
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.inputContainer}
                onPress={showDatePicker}
                activeOpacity={0.8}
            >
                <Text style={styles.inputText}>{selectedDate}</Text>
                <MaterialCommunityIcons
                    name={isVisible ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#000"
                    style={styles.icon}
                />
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={new Date(selectedDate?.split("/").reverse().join("-") || '')}
                maximumDate={new Date()}
            />
        </View>
    );
};

export default DatePicker;
