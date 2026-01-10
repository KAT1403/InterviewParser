import { createAppApiService } from '@/shared/api';
import type { GlobalAnalytics, InterviewAnalytics, DateFilter } from '@/shared/api';

const api = createAppApiService();

export const analyticsApi = {
  async getGlobalAnalytics(filters?: DateFilter): Promise<GlobalAnalytics> {
    const response = await api.get<GlobalAnalytics>('/analytics/global', { params: filters });
    return response.data;
  },

  async getAllInterviewAnalytics(filters?: DateFilter): Promise<InterviewAnalytics[]> {
    const response = await api.get<InterviewAnalytics[]>('/analytics/interview', { params: filters });
    return response.data;
  },

  async getInterviewAnalytics(interviewId: number): Promise<InterviewAnalytics> {
    const response = await api.get<InterviewAnalytics>(`/analytics/interview/${interviewId}`);
    return response.data;
  }
};