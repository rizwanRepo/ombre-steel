import { StyleSheet } from "react-native";

const TableStyles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        paddingBottom: 20,
        flex: 1,
        overflow: "scroll"
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 14,
        color: '#222',
    },
    headerCellItem: {
        width: '65%',
    },
    headerCellQuantity: {
        width: '35%',
        marginLeft: 10,
    },
});

export default TableStyles;
