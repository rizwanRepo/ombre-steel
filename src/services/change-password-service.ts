import axios from "axios";

import { BASE_URL } from "../constants";

export interface ChangePasswordPayload {
    userId: number | undefined;
    currentPassword: string | undefined;
    newPassword: string;
    confirmPassword: string;
}

export interface ResetPasswordPayload {
    email: string,
    password: string,
    confirmPassword: string,
    isMobile: boolean
}


export class ChangePasswordService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${BASE_URL}/auth`;
    }

    create(createPassword: ChangePasswordPayload) {
        return axios
            .post(`${this.baseUrl}/change-password`, createPassword)
            .then((response) => response.data);
    }

    resetPassword(payload: ResetPasswordPayload) {
        return axios
            .post(`${this.baseUrl}/reset-password`, payload)
            .then((response) => response.data);
    }

};
