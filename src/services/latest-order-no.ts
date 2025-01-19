import axios from "axios";

import { BASE_URL } from "../constants";

export class LatestOrderNoService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/saleOrder/latest/orderNo`;
    }

    get() {
        return axios
            .get(this.baseUrl)
            .then((response) => response.data.latestOrderNo);
    }
};
