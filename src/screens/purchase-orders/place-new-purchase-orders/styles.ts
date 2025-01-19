import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f4f7',
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        borderRadius: 6,
        display: "flex",
        justifyContent: "space-evenly"
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#222',
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 14,
        width: "100%",
        backgroundColor: "#fff",
    },
    headerCellItem: {
        width: '33%',
        marginLeft: 10,
    },
    headerCellQuantity: {
        width: '33%',
        marginLeft: -30,
    },
    headerCellRate: {
        width: '33%',
        marginRight: 30,
        left: 0,
        display: "flex",
    },
    footer: {
        position: "absolute",
        bottom: 20,
        left: 16,
        right: 16,
        alignItems: "center",
    },
    disabledRateInput: {
        backgroundColor: "#f0f0f0",
    },
    rateInput: {
        borderColor: "#ccc",
        borderWidth: 1,
        backgroundColor: "#ffffff",
    },
});

export default styles;
