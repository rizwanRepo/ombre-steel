import { StyleSheet } from 'react-native';

const OrderListViewStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: -10
    },
    headerCellItem: {
        width: '18%',
    },
    headerCellQuantity: {
        width: '27%',
    },
    headerCellStatus: {
        width: '14%',
    },
    headerText: {
        fontSize: 13,
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
        justifyContent: 'space-between',
    },
    colorItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorCircle: {
        width: 15,
        height: 15,
        borderRadius: 20,
    },
    colorName: {
        marginLeft: 5,
        fontSize: 12
    },
});

export default OrderListViewStyles;
