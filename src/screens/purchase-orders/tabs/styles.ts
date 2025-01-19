import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ddd'
    },
    activeTab: {
        borderBottomColor: '#000'
    },
    tabText: {
        fontSize: 16,
        color: '#555'
    },
    activeTabText: {
        fontWeight: 'bold',
        color: '#000'
    },
});

export default styles;
