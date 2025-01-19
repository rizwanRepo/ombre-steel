import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

interface IProps {
    title: string;
}

const EmptyListMessage = ({ title }: IProps) => (
    <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
    </View>
);

export default EmptyListMessage;
