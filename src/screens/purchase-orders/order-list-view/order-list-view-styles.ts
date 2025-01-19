import { StyleSheet } from 'react-native';

const OrderListViewStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    headerCellItem: {
        width: '40%',
    },
    headerCellQuantity: {
        width: '30%',
    },
    headerCellStatus: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8,
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: "#fff",
        borderColor: "#16486B",
        borderWidth: 1
    },
    textStyle: {
        color: "#16486B"
    },
    colorsContainer: {
        marginVertical: 20,
    },
    colorsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    colorItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    colorCircle: {
        width: 20,
        height: 20,
        borderRadius: 20,
    },
    colorName: {
        marginTop: 5,
    },
});

export default OrderListViewStyles;
