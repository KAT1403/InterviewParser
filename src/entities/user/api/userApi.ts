import { createAppApiService } from '@/shared/api';
import type { User, CreateUserRequest, UpdateUserRequest, PaginationParams } from '@/shared/api';

const api = createAppApiService();

export const userApi = {
  async getUsers(params?: PaginationParams): Promise<User[]> {
    const response = await api.get<User[]>('/users', { params });
    return response.data;
  },

  async getUser(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await api.post<User>('/users', data);
    return response.data;
  },

  async updateUser(id: number, data: UpdateUserRequest): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  }
};