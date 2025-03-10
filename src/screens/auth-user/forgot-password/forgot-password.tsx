import React from "react";
import {
    View,
    Text,
    Platform,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import CustomButton from "../../../components/custom-button/custom-button";
import { ForgotPasswordPayload, LoginService } from "../../../services/login-service";
import { getErrorMessage } from "../../../constants";

interface FormInputs {
    email: string;
}

const ForgotPassword = () => {
    const navigation = useNavigation<any>();
    const loginService = new LoginService();
    const {
        control,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm<FormInputs>({
        mode: "onChange",
    });

    const { mutate: onSave, isPending } = useMutation({
        mutationFn: (data: ForgotPasswordPayload) => loginService.forgotPassword(data),
        onSuccess: async (data) => {
            if (!data.error) {
                navigation.navigate("verify-otp", { email: getValues("email") });
            }
        },
        onError: (error) => {
            const errorMessage = getErrorMessage(error);
            setError("email", {
                type: "custom",
                message: errorMessage,
            });
        },
    });

    const onSubmit = async (data: FormInputs) => {
        await onSave(data);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Forgot Password</Text>
                    <Text style={styles.subtitle}>Enter your email to reset your password.</Text>

                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address</Text>

                            <Controller
                                control={control}
                                name="email"
                                defaultValue=""
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address.",
                                    },
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={[
                                            styles.input,
                                            errors.email && styles.inputError,
                                        ]}
                                        autoCorrect={false}
                                        placeholder="Enter your email"
                                        placeholderTextColor="#aaa"
                                        autoCapitalize="none"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />

                            {errors.email && (
                                <Text style={styles.errorText}>{errors.email.message}</Text>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("login")}
                        style={styles.backToLoginContainer}
                    >
                        <Text style={styles.backToLoginText}>Back to login</Text>
                    </TouchableOpacity>

                    <CustomButton
                        title="Send Code"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                        isLoading={isPending}
                        disabled={!!errors.email || !getValues("email")}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ForgotPassword;
