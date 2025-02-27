import React from "react";
import { Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";
import { getFormattedDate } from "../../constants";

interface IProps {
    onDateChange: any;
    isVisible: boolean;
    hideDatePicker: () => void;
    selectedDate: string | undefined;
}

const DatePicker = ({
    onDateChange,
    selectedDate,
    isVisible,
    hideDatePicker,
}: IProps) => {

    const handleConfirm = (date: Date) => {
        const formattedDate = getFormattedDate(date);
        onDateChange(formattedDate);
        hideDatePicker();
    };

    return (
        <View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>{selectedDate}</Text>
                <MaterialCommunityIcons
                    name={isVisible ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#000"
                    style={styles.icon}
                />
            </View>

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
