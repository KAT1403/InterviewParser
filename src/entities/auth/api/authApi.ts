import { createPublicApiService } from '@/shared/api/publicApi';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/shared/api';
import { setTokens, clearTokens } from '@/shared/lib/tokens/getTokens';

const publicApi = createPublicApiService();

export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await publicApi.post<AuthResponse>('/auth/login', credentials);
    setTokens(response.data.token);
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await publicApi.post<AuthResponse>('/auth/register', userData);
    setTokens(response.data.token);
    return response.data;
  },

  async logout(): Promise<void> {
    clearTokens();
  }
};