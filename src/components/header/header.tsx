import React, { useState } from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import DatePicker from "../date-picker/date-picker";
import IconManager from "../icon-manager/icon-manager";

interface IProps {
    title: string;
    iconLibrary: "MaterialIcons" | "FontAwesome" | "Ionicons" | "MaterialCommunityIcons";
    iconName: string;
    updateDate?: (date: string) => void | undefined;
    currentDate?: string | undefined;
    date?: string;
    isCalender?: boolean;
}

const Header = ({
    title,
    iconLibrary,
    iconName,
    date,
    isCalender = false,
    currentDate,
    updateDate
}: IProps) => {

    const [isVisible, setIsVisible] = useState(false);

    const showDatePicker = () => {
        setIsVisible(true);
    };

    const hideDatePicker = () => {
        setIsVisible(false);
    };

    return (
        <View style={styles.titleContainer}>
            <IconManager
                library={iconLibrary}
                name={iconName}
            />
            <View style={isCalender ? styles.headerContent : null}>
                <Text style={styles.title}>{title}</Text>
                {isCalender && (
                    <Text style={{ width: "50%" }} onPress={showDatePicker}>
                        <DatePicker
                            onDateChange={updateDate}
                            selectedDate={currentDate}
                            isVisible={isVisible}
                            hideDatePicker={hideDatePicker}
                        />
                    </Text>
                )}
            </View>
            {date && <Text style={styles.date}>{date}</Text>}
        </View>
    );
}

export default Header;
