import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    GestureResponderEvent,
    ViewStyle,
    TextStyle,
} from 'react-native';
import styles from './styles';

type CustomButtonProps = {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    isLoading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

const CustomButton = ({
    title,
    onPress,
    isLoading = false,
    disabled = false,
    style,
    textStyle,
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                disabled && styles.disabledButton,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || isLoading}
            activeOpacity={0.7}
        >
            {isLoading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;
