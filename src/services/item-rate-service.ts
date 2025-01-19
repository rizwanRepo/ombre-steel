import axios from "axios";

import { BASE_URL } from "../constants";

export class ItemRatesService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/itemRate`;
    }

    getAll() {
        return axios
            .get(this.baseUrl)
            .then((response) => response.data.data);
    }
};
