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
        borderBottomColor: '#16486B'
    },
    tabText: {
        fontSize: 16,
        color: '#555'
    },
    activeTabText: {
        fontWeight: 'bold',
        color: '#16486B',
        fontSize: 16
    },
});

export default styles;
