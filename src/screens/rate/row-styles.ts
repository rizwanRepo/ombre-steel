import { StyleSheet } from 'react-native';

const RowStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    itemText: {
        fontSize: 14,
    },
    rateContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: 30,
    },
    price: {
        fontSize: 14,
    },
    button: {
        backgroundColor: '#16486B',
        padding: 8,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RowStyles;
