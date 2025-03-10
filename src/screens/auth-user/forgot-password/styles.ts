import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F4F9FF",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 24,
        textAlign: "center",
    },
    inputWrapper: {
        width: "100%",
        padding: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#CBCBCB",
        backgroundColor: "#FFFFFF",
        shadowColor: "#00001A",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: "#1B2B41B8",
        fontWeight: "500",
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
        fontSize: 16,
        color: "#333",
    },
    inputError: {
        borderColor: "red",
        borderWidth: 1,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
    backToLoginContainer: {
        alignSelf: "flex-end",
        marginVertical: 10,
    },
    backToLoginText: {
        color: "#16486B",
        fontSize: 14,
        textDecorationLine: "underline",
    },
    button: {
        marginTop: 30,
    },
});

export default styles;
