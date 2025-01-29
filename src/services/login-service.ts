import axios from "axios";

import { BASE_URL } from "../constants";

export interface LoginPayload {
    emailOrPhone: string;
    password: string;
}

export class LoginService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/auth`;
    }

    validateToken(token: string) {
        return axios
            .post(`${this.baseUrl}/validate-token`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => response.data.data);
    }

    create(login: LoginPayload) {
        return axios
            .post(`${this.baseUrl}/login/mobile`, login)
            .then((response) => response.data);
    }

};
