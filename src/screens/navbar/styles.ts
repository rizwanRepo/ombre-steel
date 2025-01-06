import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
    },
    title: {
        color: '#000',
        fontSize: 26,
        fontWeight: 'bold',
    },
    menuButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    dropdownMenu: {
        width: '50%',
        position: 'absolute',
        top: 80,
        right: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    selectedMenuItem: {
        backgroundColor: '#C9E9FF',
    },
    menuItemText: {
        fontSize: 16,
        color: '#000',
    },
    selectedMenuItemText: {
        color: '#333',
        fontWeight: "bold",
    },
});

export default styles;