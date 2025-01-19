import { MenuItem } from "./screens/navbar/navbar";

export const BASE_URL = "http://45.79.121.211:5001"

export const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
};

export const PURCHASE_TAB_ITEMS = [
    { key: 'details', label: 'Details' },
    { key: 'order-items', label: 'Order Items' },
    { key: 'delivered', label: 'Delivered' },
];


// Mock data for Menu
export const MENU_ITEMS: MenuItem[] = [
    { id: 'inventory', label: 'Inventory', route: '/' },
    { id: 'rates', label: 'Rates', route: 'rates' },
    { id: 'sale-orders', label: "Sale Order", route: 'sale-orders' },
    { id: 'purchase-orders', label: 'Purchase Order', route: 'purchase-orders' },
    { id: 'logout', label: 'Logout', route: 'logout' },
];

// Status Colors Name For Purchase Orders
export const PURCHASE_ORDERS_STATUS = [
    { name: "Completed", hex: "#4bad4b" },
    { name: "In Progress", hex: "#c8a86c" },
    { name: "Not Started", hex: "#4A9ADF" },
];