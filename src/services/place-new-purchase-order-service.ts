import axios from "axios";

import { BASE_URL } from "../constants";

export class PlaceNewPurchaseOrderService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/saleOrder/party/order`;
    }

    create(purchaseOrder: any) {
        return axios
            .post(this.baseUrl, purchaseOrder)
            .then((response) => response.data);
    }
};
