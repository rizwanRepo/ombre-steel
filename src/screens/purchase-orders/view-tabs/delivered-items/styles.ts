import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    detailsContainer: {
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        marginTop: 20,
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    cellDetail: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        color: "grey",
    },
    pendingContainer: {
        marginTop: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: "center",
    },
    pendingLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#d9534f',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 2
    },
    pendingValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
});

export default styles;
