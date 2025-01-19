import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RateScreen from '../screens/rate';
import LoginScreen from '../screens/login/login-screen';
import InventoryScreen from '../screens/inventory';
import ChangePasswordScreen from '../screens/change-password/change-password-screen';
import SaleOrderScreen from '../screens/sale-orders';
import PurchaseOrderScreen from '../screens/purchase-orders';
import AddTodaySaleOrders from '../screens/sale-orders/add-today-sale-orders/add-today-sale-orders';
import PurchaseOrderDetailScreen from '../screens/purchase-orders/view-tabs';
import PlaceNewPurchaseOrders from '../screens/purchase-orders/place-new-purchase-orders/place-new-purchase-orders';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator initialRouteName="login">
        <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="change-password"
            component={ChangePasswordScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name='/'
            component={InventoryScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name='rates'
            component={RateScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name='sale-orders'
            component={SaleOrderScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name='purchase-orders'
            component={PurchaseOrderScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name='place-new-purchase-orders'
            component={PlaceNewPurchaseOrders}
            options={{
                headerShown: true,
                title: "Purchase Orders"
            }}
        />
        <Stack.Screen
            name="purchase-order-detail"
            component={PurchaseOrderDetailScreen}
            options={{
                headerShown: true,
                title: "Purchase Orders"
            }}
        />
        <Stack.Screen
            name="add-today-sale-orders"
            component={AddTodaySaleOrders}
            options={{
                headerShown: true,
                title: "Sale Orders"
            }}
        />
    </Stack.Navigator>
);

export default AuthNavigator;
