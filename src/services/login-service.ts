import axios from "axios";

import { BASE_URL } from "../constants";

export interface LoginPayload {
    emailOrPhone: string;
    password: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface VerifyOTPPayload {
    otp: string;
    email: string;
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

    create(payload: LoginPayload) {
        return axios
            .post(`${this.baseUrl}/login/mobile`, payload)
            .then((response) => response.data);
    }

    forgotPassword(payload: ForgotPasswordPayload) {
        return axios
            .post(`${this.baseUrl}/forgot-password`, payload)
            .then((response) => response.data);
    }


    verifyOTP(payload: VerifyOTPPayload) {
        return axios
            .post(`${this.baseUrl}/forgot-password/verify-otp`, payload)
            .then((response) => response.data);
    }

    resentOTP(payload: ForgotPasswordPayload) {
        return axios
            .post(`${this.baseUrl}/resend-otp`, payload)
            .then((response) => response.data);
    }
}
