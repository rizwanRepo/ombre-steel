import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import IconManager from "../icon-manager/icon-manager";

interface IProps {
    title: string;
    iconLibrary: "MaterialIcons" | "FontAwesome" | "Ionicons" | "MaterialCommunityIcons";
    iconName: string;
    date?: string;
}

const Header = ({
    title,
    iconLibrary,
    iconName,
    date
}: IProps) => (
    <View style={styles.titleContainer}>
        <IconManager
            library={iconLibrary}
            name={iconName}
        />
        <Text style={styles.title}>{title}</Text>
        {date && <Text style={styles.date}>{date}</Text>}
    </View>
);

export default Header;
