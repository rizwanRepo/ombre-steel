import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    dropdownContainer: { flex: 1 },
    dropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 40,
    },
    dropdownText: {
        color: "#000",
        flex: 1
    },
    placeholderText: { color: "#aaa" },
    selectedText: { color: "#333" },
    dropdownList: {
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        zIndex: 9999,
    },
    searchInput: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        padding: 10,
        fontSize: 16,
        color: "blue",
        backgroundColor: "#fff",
    },
    dropdownItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
});

export default styles;
