import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    Platform,
    TextInput,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";
import { useUser } from "../../context/user-context";
import { validateEmail } from "../../utils/validation";
import { LoginPayload, LoginService } from "../../services/login-service";
import CustomButton from "../../components/custom-button/custom-button";

interface IProps {
    navigation: {
        replace: (route: string) => void;
        navigate: (route: string) => void;
    };
}

const LoginScreen = ({ navigation }: IProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { setUser } = useUser();
    const loginService = new LoginService();

    const { mutate: onSave, isPending } = useMutation({
        mutationFn: (data: LoginPayload) => loginService.create(data),
        onSuccess: (data) => {
            setErrorMessage(null);
            setUser({
                emailOrPhone: username,
                userId: data.data.id,
                name: data.data.name,
                oldPassword: password,
                token: data.access_token,
            });
            if (!data.data.isPasswordChanged) {
                navigation.navigate("change-password");
            } else {
                navigation.replace("/");
            }
        },
        onError: () => setErrorMessage("Username or password is incorrect. Please try again."),
    });

    const handleLogin = async () => {
        const loginData = { emailOrPhone: username, password };
        await onSave(loginData);
    };

    const onEmailChange = (text: string) => {
        setUsername(text);
        setErrorMessage(null);
        setIsEmailValid(validateEmail(text));
    };

    const isButtonDisabled = !username || !password || !isEmailValid;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Image
                        alt="logo"
                        style={styles.logo}
                        source={require("../../assets/images/ombre-logo.png")}
                    />

                    <Text style={styles.title}>Log in to your Account</Text>
                    <Text style={styles.subtitle}>Please enter your details.</Text>

                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    !isEmailValid && { borderColor: "red", borderWidth: 1 },
                                ]}
                                placeholder="Enter your email"
                                placeholderTextColor="#aaa"
                                value={username}
                                autoCapitalize="none"
                                onChangeText={onEmailChange}
                            />
                            {!isEmailValid && (
                                <Text style={styles.errorBorder}>
                                    Please enter a valid email address.
                                </Text>
                            )}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <View style={{ position: "relative" }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#aaa"
                                    secureTextEntry={!isPasswordVisible}
                                    value={password}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        setErrorMessage(null);
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => setIsPasswordVisible((prev) => !prev)}
                                    style={styles.iconTouchable}
                                >
                                    <Icon
                                        name={isPasswordVisible ? "eye" : "eye-slash"}
                                        size={20}
                                        color="#aaa"
                                    />
                                </TouchableOpacity>
                            </View>

                            {errorMessage && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <CustomButton
                        title="Login"
                        onPress={handleLogin}
                        isLoading={isPending}
                        style={{ marginTop: 30 }}
                        disabled={isButtonDisabled || isPending}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
