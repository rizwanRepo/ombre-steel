import { MenuItem } from "./screens/navbar/navbar";

// export const BASE_URL = "http://45.79.121.211:5001"  // for development
export const BASE_URL = "http://45.79.121.211:5025"   // for staging

export const getFormattedDate = (date?: Date) => {
    const today = date || new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
};

export const PURCHASE_TAB_ITEMS = [
    { key: 'details', label: 'Details' },
    { key: 'order-items', label: 'Order Items' },
    { key: 'dispatched', label: 'Dispatched' },
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

export const TAB_NAME = ['details', 'order-items', 'dispatched'];
export const SWIPE_THRESHOLD = 50;