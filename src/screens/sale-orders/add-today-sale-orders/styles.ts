import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
    removeButton: {
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        top: 20,
        marginLeft: -2,
    },
    submitButton: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    addButton: {
        flexDirection: "row",
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    addButtonText: {
        color: "#fff",
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    secondRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
    },
    disabledRateInput: {
        backgroundColor: "#f0f0f0",
    },
    gradeText: {
        fontSize: 16,
        color: '#333',
    },
});

export default styles;




/**
 * import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
    removeButton: {
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
        marginLeft: -8,
    },
    submitButton: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    addButton: {
        flexDirection: "row",
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    addButtonText: {
        color: "#fff",
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 14,
        color: '#222',
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 6,
        fontSize: 12,
        width: "100%",
        backgroundColor: "#fff",
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default styles;

 */