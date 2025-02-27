import { Platform, StyleSheet } from "react-native";

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
        width: "50%",
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
        fontSize: 14,
        padding: 16,
        color: "#333",
        fontWeight: "400",
        width: "50%",
    },
    quantity: {
        width: "35%",
        padding: 16,
        fontSize: 14,
        color: "#222222",
        borderLeftWidth: 1,
        borderRightColor: "#ddd",
        paddingLeft: 16,
        fontWeight: "400",
    },
    addButton: {
        backgroundColor: "#fff",
        borderColor: "#16486B",
        borderWidth: 1
    },
    textStyle: {
        color: "#16486B"
    },
    editIconContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderLeftWidth: 1,
        borderLeftColor: "#ddd",
        width: 40
    },
    addButtonContainer: {
        marginHorizontal: 50,
        marginTop: 10,
        marginBottom: Platform.OS === 'ios' ? 10 : 0
    }
});

export default styles;
