import { StyleSheet } from 'react-native';

const TableStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 4,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222222',
        marginLeft: 8,
    },
    logo: {
        width: 20
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default TableStyles;
