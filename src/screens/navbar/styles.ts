import { Platform, StyleSheet } from 'react-native';

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isIOS ? 50 : 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 40,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    menuButton: {
        padding: 8,
        borderRadius: 20,
    },
    dropdownMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 280,
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: -2, height: 0 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    logoContainer: {
        padding: 24,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    logoImage: {
        width: 120,
        height: 60,
        marginBottom: 12,
    },
    organizationName: {
        fontSize: 18,
        fontWeight: 600,
        color: '#333',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 30,
        letterSpacing: 0.5,
    },
    menuList: {
        flex: 1,
        paddingTop: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginHorizontal: 8,
        borderRadius: 8,
    },
    menuIcon: {
        width: 24,
        marginRight: 16,
        textAlign: 'center',
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
        letterSpacing: 0.3,
    },
    selectedMenuItem: {
        backgroundColor: '#F0F8FF',
    },
    selectedMenuItemText: {
        color: '#007AFF',
        fontWeight: 600,
    },
    logoutMenuItem: {
        marginTop: 8,
    },
    logoutText: {
        color: '#FF3B30',
        fontWeight: 600,
    },
    logoutDivider: {
        height: 1,
        backgroundColor: '#E5E5E5',
        marginTop: 8,
        marginHorizontal: 16,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default styles;
