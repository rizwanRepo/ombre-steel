import React from "react";
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
}: IProps) => (
    <View style={styles.titleContainer}>
        <IconManager
            library={iconLibrary}
            name={iconName}
        />
        <View style={isCalender ? styles.headerContent : null}>
            <Text style={styles.title}>{title}</Text>
            {isCalender && (
                <Text style={{ width: "50%" }}>
                    <DatePicker
                        onDateChange={updateDate}
                        selectedDate={currentDate}
                    />
                </Text>
            )}
        </View>
        {date && <Text style={styles.date}>{date}</Text>}
    </View>
);

export default Header;
