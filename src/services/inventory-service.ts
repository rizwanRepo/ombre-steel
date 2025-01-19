import axios from "axios";

import { BASE_URL } from "../constants";

export class InventoryService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/partyWiseItemList`;
    }

    getAll() {
        return axios
            .get(this.baseUrl)
            .then((response) => response.data.data);
    }

};
