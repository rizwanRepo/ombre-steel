import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

import styles from "./styles";

interface IProps {
    message?: string;
    size?: "small" | "large";
    color?: string;
}

const LoadingIndicator = ({
    message = "Loading...",
    size = "large",
    color = "#ccc",
}: IProps) => {
    return (
        <View style={styles.center}>
            <ActivityIndicator size={size} color={color} />
            <Text style={styles.loadingText}>{message}</Text>
        </View>
    );
};

export default LoadingIndicator;
