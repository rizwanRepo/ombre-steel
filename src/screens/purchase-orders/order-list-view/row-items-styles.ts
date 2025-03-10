import { StyleSheet } from 'react-native';

const RowListStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 4,
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: '#ddd',
    },
    itemContainer: {
        width: 60,
        alignContent: 'center',
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        padding: 16,
        fontSize: 14,
        fontWeight: "400",
        color: '#222222',
    },
    quantityContainer: {
        width: 100,
        justifyContent: 'center',
        textAlign: 'center',
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    itemNameContainer: {
        width: "auto",
        minWidth: 80,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: '#ddd',
        marginLeft: -15,
    },
    viewContainer: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderColor: '#ddd',
    },
    iconContainer: {
        alignItems: "center",
    },
    quantity: {
        color: '#222222',
        fontSize: 12,
        display: 'flex',
        alignContent: 'center',
        textAlign: 'center',
        fontWeight: "400",
        justifyContent: 'center',
    },

    statusContainer: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
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
