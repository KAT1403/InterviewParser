import { createAppApiService } from '@/shared/api';
import type { 
  InterviewWithQA, 
  UpdateInterviewRequest, 
  MockInterview, 
  CreateMockInterviewRequest,
  UpdateMockInterviewRequest,
  MockInterviewResult,
  CreateMockInterviewResultRequest,
  UpdateMockInterviewResultRequest,
  MockInterviewStatusHistory,
  DateFilter
} from '@/shared/api';

const api = createAppApiService();

export const interviewApi = {
  async getInterviews(filters?: DateFilter): Promise<InterviewWithQA[]> {
    const response = await api.get<InterviewWithQA[]>('/interview', { params: filters });
    return response.data;
  },

  async getInterview(id: number): Promise<InterviewWithQA> {
    const response = await api.get<InterviewWithQA>(`/interview/${id}`);
    return response.data;
  },

  async createInterview(interview: InterviewWithQA): Promise<void> {
    await api.post('/interview', interview);
  },

  async updateInterview(id: number, data: UpdateInterviewRequest): Promise<void> {
    await api.put(`/interview/${id}`, data);
  },

  async deleteInterview(id: number): Promise<void> {
    await api.delete(`/interview/${id}`);
  },

  async uploadInterviewFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/interview/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async getMockInterviews(filters?: {
    id?: number;
    share_token?: string;
    user_id?: number;
    status?: string;
  }): Promise<MockInterview[]> {
    const response = await api.get<MockInterview[]>('/mock_interviews', { params: filters });
    return response.data;
  },

  async getMockInterview(id: number): Promise<MockInterview> {
    const response = await api.get<MockInterview>(`/mock_interviews/${id}`);
    return response.data;
  },

  async getMockInterviewByToken(token: string): Promise<MockInterview> {
    const response = await api.get<MockInterview>(`/mock_interviews/share/${token}`);
    return response.data;
  },

  async createMockInterview(data: CreateMockInterviewRequest): Promise<MockInterview> {
    const response = await api.post<MockInterview>('/mock_interviews', data);
    return response.data;
  },

  async updateMockInterview(id: number, data: UpdateMockInterviewRequest): Promise<MockInterview> {
    const response = await api.put<MockInterview>(`/mock_interviews/${id}`, data);
    return response.data;
  },

  async deleteMockInterview(id: number): Promise<void> {
    await api.delete(`/mock_interviews/${id}`);
  },

  async updateMockInterviewStatus(id: number, status: string): Promise<MockInterview> {
    const response = await api.patch<MockInterview>(`/mock_interviews/${id}/status`, { status });
    return response.data;
  },

  async getMockInterviewStatusHistory(id: number): Promise<MockInterviewStatusHistory> {
    const response = await api.get<MockInterviewStatusHistory>(`/mock_interviews/${id}/status_history`);
    return response.data;
  },

  async getMockInterviewResult(mockInterviewId: number): Promise<MockInterviewResult> {
    const response = await api.get<MockInterviewResult>(`/mock_interviews/${mockInterviewId}/result`);
    return response.data;
  },

  async getMockInterviewResultById(id: number): Promise<MockInterviewResult> {
    const response = await api.get<MockInterviewResult>(`/mock_interview_results/${id}`);
    return response.data;
  },

  async createMockInterviewResult(data: CreateMockInterviewResultRequest): Promise<MockInterviewResult> {
    const response = await api.post<MockInterviewResult>('/mock_interview_results', data);
    return response.data;
  },

  async updateMockInterviewResult(id: number, data: UpdateMockInterviewResultRequest): Promise<MockInterviewResult> {
    const response = await api.put<MockInterviewResult>(`/mock_interview_results/${id}`, data);
    return response.data;
  },

  async deleteMockInterviewResult(id: number): Promise<void> {
    await api.delete(`/mock_interview_results/${id}`);
  },

  async regenerateMockInterviewResult(id: number, force = false): Promise<MockInterviewResult> {
    const response = await api.post<MockInterviewResult>(`/mock_interviews/${id}/regenerate_result`, null, {
      params: { force }
    });
    return response.data;
  }
};