import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#222",
    },
    headerCellItem: {
        width: "65%",
    },
    headerCellQuantity: {
        width: "35%",
        marginLeft: 10,
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        marginBottom: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    itemName: {
        fontSize: 16,
        padding: 16,
        color: "#222222",
        fontWeight: "500",
        width: "65%",
    },
    quantity: {
        width: "35%",
        padding: 16,
        fontSize: 16,
        color: "#222222",
        borderLeftWidth: 1,
        borderRightColor: "#ddd",
        paddingLeft: 16,
        fontWeight: "500",
    },
    addButton: {
        backgroundColor: "#fff",
        borderColor: "#16486B",
        borderWidth: 1
    },
    textStyle: {
        color: "#16486B"
    },
});

export default styles;
