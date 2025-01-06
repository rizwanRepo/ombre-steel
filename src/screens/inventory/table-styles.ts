import { StyleSheet } from "react-native";

const TableStyles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        marginTop: 20,
        paddingBottom: 20,
        flex: 1,
        overflow: "scroll"
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
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 16,
        color: '#222',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default TableStyles;
