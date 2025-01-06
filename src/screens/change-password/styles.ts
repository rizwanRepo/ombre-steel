import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F4F9FF',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8,
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8,
        marginTop: 30,
    },
    subtitle: {
        fontSize: 16,
        color: '#1A293DD4',
        marginBottom: 24,
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
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
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
        right: 10,
        top: "55%",
        transform: [{ translateY: -12 }],
        zIndex: 1,
    },
    iconImage: {
        width: 30,
        height: 20,
        tintColor: '#1C2E4599',
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
