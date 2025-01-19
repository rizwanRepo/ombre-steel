import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

interface IProps {
    library: "MaterialIcons" | "FontAwesome" | "Ionicons" | "MaterialCommunityIcons";
    name: string;
    size?: number;
    color?: string;
    style?: object;
}

const IconManager = ({
    library,
    name,
    size = 20,
    color = "#333",
    style
}: IProps) => {
    const IconComponent = (() => {
        switch (library) {
            case "MaterialIcons":
                return MaterialIcons;
            case "FontAwesome":
                return FontAwesome;
            case "Ionicons":
                return Ionicons;
            case "MaterialCommunityIcons":
                return MaterialCommunityIcons
            default:
                return MaterialIcons;
        }
    })();

    return <IconComponent name={name} size={size} color={color} style={style} />;
};

export default IconManager;
