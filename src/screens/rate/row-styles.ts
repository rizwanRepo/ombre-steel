import { StyleSheet } from 'react-native';

const RowStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    rateContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: 30,
    },
    rate: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    change: {
        fontSize: 12,
        fontWeight: 400,
    },
    changeUp: {
        color: 'green',
    },
    changeDown: {
        color: 'red',
    },
    button: {
        backgroundColor: '#16486B',
        padding: 8,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RowStyles;
