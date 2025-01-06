import { MenuItem } from "./screens/navbar/navbar";

export const BASE_URL = "http://192.168.95.249:5001"

export const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
};

// Mock data for inventory
export const INVENTORY_DATA = [
    { id: '1', item: '1 in. 2 ft. pipe', quantity: '1 Kg' },
    { id: '2', item: '2 in. 4 ft. pipe', quantity: '2 Pcs' },
    { id: '3', item: '3 in. 6 ft. pipe', quantity: '3 Kg' },
    { id: '4', item: '4 in. 8 ft. pipe', quantity: '4 Pcs' },
    { id: '5', item: '5 in. 10 ft. pipe', quantity: '5 Kg' },
    { id: '6', item: '6 in. 12 ft. pipe', quantity: '6 Pcs' },
    { id: '7', item: '7 in. 14 ft. pipe', quantity: '7 Kg' },
    { id: '8', item: '8 in. 16 ft. pipe', quantity: '8 Pcs' },
    { id: '9', item: '9 in. 18 ft. pipe', quantity: '9 Kg' },
    { id: '10', item: '10 in. 20 ft. pipe', quantity: '10 Pcs' },
    { id: '11', item: '11 in. 22 ft. pipe', quantity: '11 Kg' },
    { id: '12', item: '12 in. 24 ft. pipe', quantity: '12 Pcs' },
    { id: '13', item: '13 in. 24 ft. pipe', quantity: '13 Kg' },
    { id: '14', item: '14 in. 24 ft. pipe', quantity: '14 Pcs' },
    { id: '15', item: '15 in. 24 ft. pipe', quantity: '15 Kg' },
];

// Mock data for Sale Order
export const SALE_ORDER_DATA = [
    { id: '1', item: '1 in. 2 ft. pipe', quantity: '1 Kg', status: "Completed" },
    { id: '2', item: '2 in. 4 ft. pipe', quantity: '2 Pcs', status: "Not completed" },
    { id: '3', item: '3 in. 6 ft. pipe', quantity: '3 Kg', status: "Completed" },
    { id: '4', item: '4 in. 8 ft. pipe', quantity: '4 Pcs', status: "Not completed" },
    { id: '5', item: '5 in. 10 ft. pipe', quantity: '5 Kg', status: "Completed" },
    { id: '6', item: '6 in. 12 ft. pipe', quantity: '6 Pcs', status: "Not completed" },
    { id: '7', item: '7 in. 14 ft. pipe', quantity: '7 Kg', status: "Completed" },
    { id: '8', item: '8 in. 16 ft. pipe', quantity: '8 Pcs', status: "Not completed" },
    { id: '9', item: '9 in. 18 ft. pipe', quantity: '9 Kg', status: "Completed" },
    { id: '10', item: '10 in. 20 ft. pipe', quantity: '10 Pcs', status: "Completed" },
    { id: '11', item: '11 in. 22 ft. pipe', quantity: '11 Kg', status: "Not completed" },
    { id: '12', item: '12 in. 24 ft. pipe', quantity: '12 Pcs', status: "Completed" },
    { id: '13', item: '13 in. 24 ft. pipe', quantity: '13 Kg', status: "Not completed" },
    { id: '14', item: '14 in. 24 ft. pipe', quantity: '14 Pcs', status: "Completed" },
    { id: '15', item: '15 in. 24 ft. pipe', quantity: '15 Kg', status: "Not completed" },
];

// Mock data for Menu
export const MENU_ITEMS: MenuItem[] = [
    { id: '1', label: 'Inventory', route: '/' },
    { id: '2', label: 'Rates', route: 'rates' },
    { id: '3', label: "Add today's sales", route: 'today-sales' },
    { id: '4', label: 'Purchase orders', route: 'purchase-orders' },
    { id: '5', label: 'Logout', route: 'login' },
];

// Mock data for Rates
export const RATES_DATA = [
    { item: 'Gold', rate: '77,980/10g', change: '+1 (+0.53%)' },
    { item: 'Silver', rate: '99,000/1kg', change: '-20 (-0.52%)' },
    { item: 'Steel', rate: '3619/1kg', change: '+35 (+6.54%)' },
    { item: 'Iron', rate: '104/1kg', change: '+30 (+1.66%)' }
];