import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RateScreen from '../screens/rate';
import LoginScreen from '../screens/login/login-screen';
import InventoryScreen from '../screens/inventory';
import ChangePasswordScreen from '../screens/change-password/change-password-screen';
import TodaySaleScreen from '../screens/today-sale/today-sale-screen';
import SaleOrderScreen from '../screens/purchase-order';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="change-password" component={ChangePasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name='/' component={InventoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name='rates' component={RateScreen} options={{ headerShown: false }} />
            <Stack.Screen name='today-sales' component={TodaySaleScreen} options={{ headerShown: false }} />
            <Stack.Screen name='purchase-orders' component={SaleOrderScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
