import { StyleSheet } from "react-native";

const RowStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        fontSize: 16,
        padding: 16,
        color: "#222222",
        fontWeight: 500,
        width: "75%"
    },
    quantity: {
        width: "25%",
        padding: 16,
        fontSize: 16,
        color: "#222222",
        borderLeftWidth: 1,
        borderRightColor: '#ddd',
        paddingLeft: 16,
        fontWeight: 500
    },
});

export default RowStyles;