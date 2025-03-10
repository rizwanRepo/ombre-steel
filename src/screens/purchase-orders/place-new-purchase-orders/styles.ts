import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f4f7',
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        borderRadius: 6,
        display: "flex",
        width: "100%",
        justifyContent: "space-between"
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 8,
        width: "100%",
        justifyContent: "space-between",
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#222',
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 12,
        width: "100%",
        backgroundColor: "#fff",
    },
    headerCell: {
        width: 120,
    },
    footer: {
        position: "absolute",
        bottom: 20,
        left: 16,
        right: 16,
        alignItems: "center",
    },
    disabledRateInput: {
        backgroundColor: "#f0f0f0",
    },
    inputContainer: {
        width: 120,
    },
    cardContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
});

export default styles;
