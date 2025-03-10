import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
        color: "#000",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginVertical: 10,
        textAlign: "center",
    },
    sentEmail: {
        color: "#16486B",
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 20
    },
    inputWrapper: {
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
        width: "100%",
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
        // paddingHorizontal: 12,
        backgroundColor: "#fff",
        fontSize: 16,
        color: "#333",
        paddingLeft: 10
        // textAlign: "center",
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
    resendOtpContainer: {
        marginVertical: 15,
    },
    resendOtpText: {
        color: "#16486B",
        fontSize: 14,
        textDecorationLine: "underline",
    },
    button: {
        marginTop: 20,
    },
    resentOtpContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        flexDirection: "row",
        gap: 10,
    },
    backToLoginText: {
        fontSize: 16,
        color: "#007bff",
        textAlign: "center",
        // marginBottom: 5,
        fontWeight: "bold"
    },
    timerText: {
        fontSize: 16,
        // marginBottom: 5,
        textAlign: "center",
        fontWeight: "bold",
        color: "red"
    },
});
