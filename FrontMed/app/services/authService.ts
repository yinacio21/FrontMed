import api from "./api";
import { LoginRequest, LoginResponse } from "../types/auth";

export async function loginService(loginRequest: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", loginRequest);
    return response.data;
}
