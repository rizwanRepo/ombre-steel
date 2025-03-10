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
    grade: {
        fontSize: 14,
        fontWeight: "500",
        width: "20%",
        alignItems: 'center',
        textAlign: "right",
    },
    itemName: {
        width: "20%",
        display: "flex",
        fontSize: 14,
        fontWeight: "500",
    },
    rateContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        alignContent: "center",
        width: "30%",
        marginRight: 30,
    },
    price: {
        fontSize: 14,
        fontWeight: "500"
    },
    button: {
        backgroundColor: '#16486B',
        padding: 8,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RowStyles;
