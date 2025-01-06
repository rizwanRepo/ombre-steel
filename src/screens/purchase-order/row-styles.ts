import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },

    itemContainer: {
        width: '50%',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        fontSize: 16,
        padding: 16,
        color: '#222222',
        fontWeight: '500',
    },

    quantityContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    quantity: {
        fontSize: 16,
        color: '#222222',
        fontWeight: '500',
    },

    statusContainer: {
        width: '30%',
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
    completed: {
        backgroundColor: '#4bad4b',
    },
    notCompleted: {
        backgroundColor: '#c8a86c',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
});

export default styles;
