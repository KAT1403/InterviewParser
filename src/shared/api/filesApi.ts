import { createAppApiService } from '@/shared/api';

const api = createAppApiService();

export const filesApi = {
  async downloadFile(name: string): Promise<Blob> {
    const response = await api.get(`/files/${name}`, {
      responseType: 'blob'
    });
    return response.data;
  },

  async getFileUrl(name: string): Promise<string> {
    return `https://ib.mrbelka12000.com/files/${name}`;
  }
};