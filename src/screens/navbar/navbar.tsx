import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    useNavigation,
    NavigationProp,
    useRoute,
    RouteProp
} from '@react-navigation/native';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
} from 'react-native';

import styles from './styles';
import { useUser } from '../../context/user-context';
import { ADMIN_MENU_ITEMS, PARTY_MENU_ITEMS } from '../../constants';

export interface MenuItem {
    id: string;
    label: string;
    route: string;
};

const Navbar = () => {
    const { logout, user } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const route = useRoute<RouteProp<Record<string, object | undefined>, string>>();

    const currentRouteLabel = (user?.isAdmin ? ADMIN_MENU_ITEMS : PARTY_MENU_ITEMS).find(item => item.route === route.name)?.label;

    const handleMenuItemPress = async (item: MenuItem) => {
        setIsMenuOpen(false);
        if (item.id === "logout") {
            await logout();
            navigation.navigate("login");
        } else {
            navigation.navigate(item.route);
        }
    };

    const renderMenuItem = ({ item }: { item: MenuItem }) => {
        const isSelected = route.name === item.route;
        return (
            <TouchableOpacity
                style={[styles.menuItem, isSelected && styles.selectedMenuItem]}
                onPress={() => handleMenuItemPress(item)}
            >
                <Text style={[styles.menuItemText, isSelected && styles.selectedMenuItemText]}>
                    {item.label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {(route.name !== "godown-report" && route.name !== "/") && <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="#000"
                />
            </TouchableOpacity>}

            <Text style={[
                styles.title,
                (route.name === "/" || route.name === "godown-report") &&
                { marginLeft: 10 }]
            }>
                {currentRouteLabel}
            </Text>

            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
                <MaterialIcons
                    name={isMenuOpen ? 'close' : 'menu'}
                    size={25}
                    color="#000"
                />
            </TouchableOpacity>

            <Modal
                transparent
                visible={isMenuOpen}
                animationType="fade"
                onRequestClose={() => setIsMenuOpen(false)}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setIsMenuOpen(false)}
                >
                    <View style={styles.dropdownMenu}>
                        <FlatList
                            data={user?.isAdmin ? ADMIN_MENU_ITEMS : PARTY_MENU_ITEMS}
                            keyExtractor={(item) => item.id}
                            renderItem={renderMenuItem}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default Navbar;
