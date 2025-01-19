import axios from "axios";

import { BASE_URL } from "../constants";

export class PurchaseOrderService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/saleOrder`;
    }

    getAll() {
        return axios
            .get(`${this.baseUrl}/party/purchaseOrder`)
            .then((response) => response.data.data);
    }

    getOne(orderId: number) {
        return axios
            .get(`${this.baseUrl}/${orderId}?type=orderNo`)
            .then((response) => response.data.data);
    }
};
