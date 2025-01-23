import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 8,
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 4,
        borderWidth: 1,
        height: 40,
        borderColor: '#ddd',
        paddingHorizontal: 20
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
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        // marginTop: 8,
    },
});

export default styles;
