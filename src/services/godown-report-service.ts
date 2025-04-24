import axios from "axios";

import { BASE_URL } from "../constants";

export class GodownReportService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/report/godownWise`;
    }

    create(payload: any) {
        return axios
            .post(this.baseUrl, payload)
            .then((response) => response.data.data);
    }

    getAll() {
        return axios
            .get(`${BASE_URL}/godown`)
            .then((response) => response.data.data);
    }

};
