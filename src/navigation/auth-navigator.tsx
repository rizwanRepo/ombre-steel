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

const defaultOptions = { headerShown: false };

// Define routes
const routes = [
    { name: "login", component: LoginScreen },
    { name: "change-password", component: ChangePasswordScreen },
    { name: "/", component: InventoryScreen },
    { name: "rates", component: RateScreen },
    { name: "sale-orders", component: SaleOrderScreen },
    { name: "purchase-orders", component: PurchaseOrderScreen },
    {
        name: "place-new-purchase-orders",
        component: PlaceNewPurchaseOrders,
        options: { headerShown: true, title: "Purchase Orders" },
    },
    {
        name: "purchase-order-detail",
        component: PurchaseOrderDetailScreen,
        options: { headerShown: true, title: "Purchase Orders" },
    },
    {
        name: "add-today-sale-orders",
        component: AddTodaySaleOrders,
        options: { headerShown: true, title: "Sale Orders" },
    },
];

const AuthNavigator = () => (
    <Stack.Navigator initialRouteName="login">
        {routes.map(({ name, component, options }) => (
            <Stack.Screen
                key={name}
                name={name}
                component={component}
                options={
                    options?.headerShown
                        ? { ...options, ...globalHeaderStyles }
                        : options || defaultOptions
                }
            />
        ))}
    </Stack.Navigator>
);

export default AuthNavigator;

// Global header styles for screens with `headerShown: true`
const globalHeaderStyles = {
    headerStyle: {
        height: 50,
        backgroundColor: '#f8f8f8',
    },
    headerTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
};
