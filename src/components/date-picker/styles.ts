import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // padding: 10,
        position: "relative",
    },
    inputText: {
        fontSize: 16,
        color: "#222",
        textAlign: "center",
        width: "100%",
        height: "100%"
    },
    icon: {
        position: "absolute",
        right: 0,
        top: 1
    },
});

export default styles;
