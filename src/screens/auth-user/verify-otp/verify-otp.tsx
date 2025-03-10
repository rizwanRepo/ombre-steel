import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useRoute, RouteProp } from "@react-navigation/native";

import styles from "./styles";
import { getErrorMessage } from "../../../constants";
import CustomButton from "../../../components/custom-button/custom-button";
import { ForgotPasswordPayload, LoginService, VerifyOTPPayload } from "../../../services/login-service";

interface FormInput {
    otp: string;
}

interface IParams {
    email: string;
}

const VerifyOtp = ({ navigation }: any) => {
    const loginService = new LoginService()
    const route = useRoute<RouteProp<{ params: IParams }>>();
    const [timer, setTimer] = useState(180);

    const {
        control,
        getValues,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormInput>({
        mode: "onChange",
    });

    const { mutate: onSave, isPending } = useMutation({
        mutationFn: (data: VerifyOTPPayload) => loginService.verifyOTP(data),
        onSuccess: () => {
            navigation.replace("change-password", { isMobile: true, email: route.params.email });
        },
        onError: (error) => {
            const errorMessage = getErrorMessage(error);
            setError("otp", {
                type: "custom",
                message: errorMessage,
            });
        },
    });

    const { mutate: resentOTP, isPending: isResent } = useMutation({
        mutationFn: (data: ForgotPasswordPayload) => loginService.resentOTP(data),
        onSuccess: () => { },
        onError: (error) => {
            const errorMessage = getErrorMessage(error);
            setError("otp", {
                type: "custom",
                message: errorMessage,
            });
        },
    });

    const onSubmit = async (data: FormInput) => {
        const { otp } = data;
        await onSave({ otp, email: route.params.email });
    };

    const handleResendOTP = async () => {
        await resentOTP({ email: route.params?.email });
        setTimer(180);
    };

    useEffect(() => {
        if (timer === 0) return;

        const intervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
                Please enter the 6-digit verification code sent to
            </Text>
            <Text style={styles.sentEmail}>{route.params.email}</Text>

            <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>OTP</Text>

                    <Controller
                        control={control}
                        name="otp"
                        defaultValue=""
                        rules={{
                            required: "OTP is required",
                            pattern: {
                                value: /^[0-9]{6}$/,
                                message: "Please enter a valid 6-digit OTP",
                            },
                        }}
                        render={({ field: { value, onChange } }) => (
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.otp && styles.inputError,
                                ]}
                                placeholder="Enter OTP"
                                placeholderTextColor="#aaa"
                                keyboardType="numeric"
                                maxLength={6}
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {errors.otp && (
                        <Text style={styles.errorText}>{errors.otp.message}</Text>
                    )}
                </View>
            </View>

            <TouchableOpacity
                onPress={timer === 0 ? handleResendOTP : undefined}
                style={styles.resentOtpContainer}
                disabled={timer !== 0}
            >
                <Text
                    style={[
                        styles.backToLoginText,
                        {
                            textDecorationLine: timer === 0 ? 'underline' : 'none',
                        },
                    ]}
                >
                    Resend OTP
                </Text>
                <Text
                    style={styles.timerText}
                >
                    {timer !== 0 ? formatTime(timer) : ""}
                </Text>
            </TouchableOpacity>

            <CustomButton
                title="Verify OTP"
                onPress={handleSubmit(onSubmit)}
                style={styles.button}
                isLoading={isPending || isResent}
                disabled={!!errors.otp || !getValues("otp")}
            />
        </KeyboardAvoidingView >
    );
};

export default VerifyOtp;
