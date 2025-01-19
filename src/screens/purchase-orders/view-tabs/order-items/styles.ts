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
        display: 'flex',
        borderColor: '#ccc',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around',
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
    }
});

export default styles;
