import axios from "axios";

import { BASE_URL } from "../constants";

export interface LoginPayload {
    emailOrPhone: string;
    password: string;
}

export class LoginService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/auth/login`;
    }

    create(login: LoginPayload) {
        return axios
            .post(this.baseUrl, login)
            .then((response) => response.data);
    }

};
