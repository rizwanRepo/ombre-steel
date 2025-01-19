import { StyleSheet } from 'react-native';

const RowListStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    itemContainer: {
        width: '30%',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        padding: 16,
        color: '#222222',
    },
    quantityContainer: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    viewContainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderColor: '#ddd',
    },
    quantity: {
        color: '#222222',
    },

    statusContainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '90%',
        height: 35,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
    },
    statusIconContainer: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RowListStyles;
