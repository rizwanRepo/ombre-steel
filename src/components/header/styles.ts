import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
    },
    date: {
        color: "#333",
        fontSize: 16,
        letterSpacing: 1,
        marginLeft: 10
    },
});

export default styles;
