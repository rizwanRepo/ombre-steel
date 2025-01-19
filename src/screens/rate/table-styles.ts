import { StyleSheet } from 'react-native';

const TableStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default TableStyles;
