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
    ListRenderItem
} from 'react-native';

import styles from './styles';
import { MENU_ITEMS } from '../../constants';
import { useUser } from '../../context/user-context';

export interface MenuItem {
    id: string;
    label: string;
    route: string;
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const route = useRoute<RouteProp<Record<string, object | undefined>, string>>();
    const { user } = useUser();

    const handleMenuItemPress = (item: MenuItem) => {
        setIsMenuOpen(false);
        navigation.navigate(item.route);
    };

    const renderMenuItem: ListRenderItem<MenuItem> = ({ item }) => {
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
            <Text style={styles.title}>{user?.name}</Text>

            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
                <MaterialIcons
                    name={isMenuOpen ? 'close' : 'menu'}
                    size={24}
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
                            data={MENU_ITEMS}
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
