import axios from "axios";

import { BASE_URL } from "../constants";

export class PurchaseOrderService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/saleOrder`;
    }

    getAll(from: string, to: string) {
        return axios
            .get(`${this.baseUrl}/party/purchaseOrder?from=${from}&to=${to}`)
            .then((response) => response.data.data);
    }

    getOne(orderId: number) {
        return axios
            .get(`${this.baseUrl}/${orderId}?type=orderNo`)
            .then((response) => response.data.data);
    }
};
