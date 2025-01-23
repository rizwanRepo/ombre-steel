import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F4F9FF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    inputWrapper: {
        padding: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#CBCBCB",
        backgroundColor: "#FFFFFF",

        // Shadow for iOS
        shadowColor: "#00001A",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,

        // Shadow for Android
        elevation: 2,
    },
    label: {
        fontSize: 14,
        color: '#1B2B41B8',
        fontWeight: 500,
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
    },
    linkText: {
        marginTop: 12,
        color: '#007bff',
        fontSize: 14,
        display: "flex",
        textAlign: "right",
    },
    logo: {
        marginBottom: 40,
    },
    inputWithIcon: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 40,
    },
    iconTouchable: {
        position: 'absolute',
        right: 5,
        top: 15,
        transform: [{ translateY: -12 }],
        zIndex: 1,
        width: 50,
        height: 45,
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent"
    },
    iconImage: {
        width: 30,
        height: 20,
        tintColor: '#1C2E4599',
    },
    errorBorder: {
        color: 'red',
        fontSize: 12,
        marginTop: 5
    },
    errorContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ffe6e6',
        borderRadius: 5,
    },
    errorText: {
        color: '#cc0000',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default styles;
