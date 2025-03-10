import { MenuItem } from "./screens/navbar/navbar";

// export const BASE_URL = "http://192.168.129.249:5001/api"  // for development
// export const BASE_URL = "http://45.79.121.211:5001/api"   // for staging
export const BASE_URL = "https://ombre.repozitory.com/api" // for Production URL

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
    { id: 'rates', label: 'Rates', route: 'rates' },
    { id: 'inventory', label: 'My Inventory', route: '/' },
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

export const ITEM_TYPES = [
    { id: 1, label: 'PIPE', value: 'PIPE' },
    { id: 2, label: 'COIL', value: 'COIL' },
    { id: 3, label: 'SHEET', value: 'SHEET' },
];

export const GRADE_LIST = [
    { id: 1, label: '304', value: '304' },
    { id: 2, label: 'JT', value: 'JT' },
];

// utils/errorUtils.ts
export const getErrorMessage = (error: any): string => {
    // Handle Axios errors
    if (error?.response?.data) {
        // Check for nested error messages (e.g., error.response.data.error.message)
        if (error.response.data.error?.message) {
            return error.response.data.error.message;
        }
        // Check for direct error messages (e.g., error.response.data.error)
        if (error.response.data.error) {
            return error.response.data.error;
        }
        // Check for generic error messages (e.g., error.response.data.message)
        if (error.response.data.message) {
            return error.response.data.message;
        }
    }

    // Handle generic errors (e.g., error.message)
    // if (error.message) {
    //     return error.message;
    // }

    // Fallback to a default error message
    return "Something went wrong. Please try again!!";
};
