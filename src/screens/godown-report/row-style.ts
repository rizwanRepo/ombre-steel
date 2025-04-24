import { StyleSheet } from "react-native";

const Row = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    godownName: {
        fontSize: 12,
        padding: 16,
        color: "#222222",
        fontWeight: 500,
        width: "65%"
    },
    quantity: {
        width: "35%",
        padding: 16,
        fontSize: 12,
        color: "#222222",
        borderLeftWidth: 1,
        borderLeftColor: '#ddd',
        paddingLeft: 16,
        fontWeight: 500
    },
});

export default Row;
