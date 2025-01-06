import axios from "axios";

import { BASE_URL } from "../constants";

export interface ChangePasswordPayload {
    userId: number | undefined;
    currentPassword: string | undefined;
    newPassword: string;
    confirmPassword: string;
}

export class ChangePasswordService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/auth/change-password`;
    }

    create(createPassword: ChangePasswordPayload) {
        return axios
            .post(this.baseUrl, createPassword)
            .then((response) => response.data);
    }

};
