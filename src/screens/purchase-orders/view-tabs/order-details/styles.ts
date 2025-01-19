import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginVertical: 60,
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
    detailsContainer: {
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    pendingContainer: {
        marginTop: 30,
        backgroundColor: '#f7f8fa',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        flexDirection: 'row',
    },
    pendingLabel: {
        fontSize: 18,
        fontWeight: '500',
        color: '#d9534f',
        marginRight: 10,
    },
    pendingValue: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    },
    cellDetail: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        color: "grey",
    },
    flexCell: {
        flex: 1,
    }
});

export default styles;
