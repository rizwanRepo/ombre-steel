import { StyleSheet } from 'react-native';

const TableStyles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        marginTop: 20,
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222222',
        marginLeft: 8,
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    headerCellItem: {
        width: '50%',
    },
    headerCellQuantity: {
        width: '20%',
    },
    headerCellStatus: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222',
    },
    fixedButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomButton: {
        borderWidth: 1,
        borderColor: '#16486B',
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 20
    },
    buttonText: {
        color: '#16486B',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },

});

export default TableStyles;
