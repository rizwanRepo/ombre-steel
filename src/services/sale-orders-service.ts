import axios from "axios";

import { BASE_URL } from "../constants";

export class SaleOrderService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/orderSalePartyWise`;
    }

    getOne(id: number) {
        return axios
            .get(`${this.baseUrl}/${id}`)
            .then((response) => response.data.data);
    }

    getAll(from: string, to: string) {
        return axios
            .get(`${this.baseUrl}?from=${from}&to=${to}`)
            .then((response) => response.data.data);
    }

    create(todaySaleOrder: any) {
        return axios
            .post(this.baseUrl, todaySaleOrder)
            .then((response) => response.data);
    }

    update(id: number | undefined, saleOrder: any) {
        return axios
            .put(`${this.baseUrl}/${id}`, saleOrder)
            .then((response) => response.data);
    }
};
