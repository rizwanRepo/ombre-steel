import axios from "axios";

import { BASE_URL } from "../constants";

export class SaleOrderService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/orderSalePartyWise`;
    }

    getAll() {
        return axios
            .get(this.baseUrl)
            .then((response) => response.data.data);
    }

    create(todaySaleOrder: any) {
        return axios
            .post(this.baseUrl, todaySaleOrder)
            .then((response) => response.data);
    }
};
