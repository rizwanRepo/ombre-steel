import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import { useUser } from '../../context/user-context';
import CustomButton from '../../components/custom-button/custom-button';
import { useMutation } from '@tanstack/react-query';
import { ChangePasswordPayload, ChangePasswordService } from '../../services/change-password-service';

interface IProps {
    navigation: {
        replace: (route: string) => void;
        navigate: (route: string) => void;
    };
}

const ChangePasswordScreen = ({ navigation }: IProps) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const changePasswordService = new ChangePasswordService();
    const { user } = useUser();

    const { mutate: onSave, isPending } = useMutation({
        mutationFn: (data: ChangePasswordPayload) => changePasswordService.create(data),
        onSuccess: () => {
            setErrorMessage(null);
            navigation.replace('/');
        },
        onError: (err: { message: string }) => {
            const errMsg = err.message || "Something went wrong, please try again.";
            setErrorMessage(errMsg);
        },
    });

    const handleResetPassword = async () => {
        setErrorMessage(null);

        const changePassword = {
            userId: user?.userId,
            currentPassword: user?.oldPassword,
            newPassword,
            confirmPassword,
        };
        await onSave(changePassword);

        // Navigate to login after successful password reset
        // navigation.replace('login');
    };

    // Validate passwords in real-time
    const validatePasswords = (newPass: string, confirmPass: string) => {
        if (newPass && confirmPass && newPass !== confirmPass) {
            setErrorMessage("Passwords do not match!");
        } else {
            setErrorMessage(null);
        }
    };

    // Determine if the button should be disabled
    const isButtonDisabled = !newPassword || !confirmPassword || errorMessage !== null;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.heading}>{user?.name}</Text>
                    <Text style={styles.title}>Create New Password</Text>

                    <Text style={styles.subtitle}>Create a strong password</Text>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Enter new password</Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="New password"
                                    placeholderTextColor="#aaa"
                                    secureTextEntry={!isNewPasswordVisible}
                                    value={newPassword}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                        setNewPassword(text);
                                        validatePasswords(text, confirmPassword);
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => setIsNewPasswordVisible((prev) => !prev)}
                                    style={styles.iconTouchable}
                                >
                                    <Icon
                                        name={isNewPasswordVisible ? 'eye' : 'eye-slash'}
                                        size={20}
                                        color="#aaa"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirm new password</Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm password"
                                    placeholderTextColor="#aaa"
                                    secureTextEntry={!isConfirmPasswordVisible}
                                    value={confirmPassword}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                        setConfirmPassword(text);
                                        validatePasswords(newPassword, text);
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => setIsConfirmPasswordVisible((prev) => !prev)}
                                    style={styles.iconTouchable}
                                >
                                    <Icon
                                        name={isConfirmPasswordVisible ? 'eye' : 'eye-slash'}
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
                        title="Submit"
                        isLoading={isPending}
                        onPress={handleResetPassword}
                        disabled={isButtonDisabled || isPending}
                        style={{ marginTop: 30 }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ChangePasswordScreen;
