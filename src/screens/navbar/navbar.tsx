import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    Animated,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    useNavigation,
    useRoute,
    NavigationProp,
    RouteProp
} from '@react-navigation/native';

import styles from './styles';
import { useUser } from '../../context/user-context';
import { ADMIN_MENU_ITEMS, PARTY_MENU_ITEMS } from '../../constants';

export interface MenuItem {
    id: string;
    label: string;
    route: string;
    icon: string;
};

const Navbar = () => {
    const { logout, user } = useUser();
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const route = useRoute<RouteProp<Record<string, object | undefined>, string>>();

    const slideAnim = useRef(new Animated.Value(300)).current;
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = user?.isAdmin ? ADMIN_MENU_ITEMS : PARTY_MENU_ITEMS;
    const currentRouteLabel = menuItems.find(item => item.route === route.name)?.label;

    useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: isMenuOpen ? 0 : 300,
            useNativeDriver: true,
            tension: 65,
            friction: 11
        }).start();
    }, [isMenuOpen]);

    const handleMenuItemPress = async (item: MenuItem) => {
        setIsMenuOpen(false);

        if (item.id === 'logout') {
            await logout();
            navigation.navigate('login');
        } else {
            navigation.navigate(item.route);
        }
    };

    const renderMenuItem = ({ item }: { item: MenuItem }) => {
        const isSelected = route.name === item.route;
        const isLogout = item.id === 'logout';

        return (
            <View>
                {isLogout && <View style={styles.logoutDivider} />}
                <TouchableOpacity
                    style={[
                        styles.menuItem,
                        isSelected && styles.selectedMenuItem,
                        isLogout && styles.logoutMenuItem
                    ]}
                    onPress={() => handleMenuItemPress(item)}
                >
                    <MaterialIcons
                        name={item.icon}
                        size={24}
                        color={isLogout ? '#FF3B30' : isSelected ? '#007AFF' : '#333'}
                        style={styles.menuIcon}
                    />
                    <Text style={[
                        styles.menuItemText,
                        isSelected && styles.selectedMenuItemText,
                        isLogout && styles.logoutText
                    ]}>
                        {item.label}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const showBackButton = route.name !== 'godown-report' && route.name !== '/';

    return (
        <View style={styles.container}>
            {showBackButton && (
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            )}

            <Text style={[
                styles.title,
                !showBackButton && { marginLeft: 10 }
            ]}>
                {currentRouteLabel}
            </Text>

            <TouchableOpacity style={styles.menuButton} onPress={() => setIsMenuOpen(!isMenuOpen)}>
                <MaterialIcons name={isMenuOpen ? 'close' : 'menu'} size={25} color="#000" />
            </TouchableOpacity>

            <Modal
                transparent
                visible={isMenuOpen}
                animationType="fade"
                onRequestClose={() => setIsMenuOpen(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <Animated.View
                                style={[
                                    styles.dropdownMenu,
                                    { transform: [{ translateX: slideAnim }] }
                                ]}
                            >
                                <View style={styles.logoContainer}>
                                    <Image
                                        source={{ uri: user?.logoUrl }}
                                        style={styles.logoImage}
                                        resizeMode='contain'
                                    />
                                    <Text style={styles.organizationName}>
                                        {user?.organizationName}
                                    </Text>
                                </View>

                                <FlatList
                                    data={menuItems}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderMenuItem}
                                    style={styles.menuList}
                                />
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    );
};

export default Navbar;
