export interface QuestionAnswer {
  id: number;
  interview_id: number;
  user_id: number;
  question: string;
  full_answer: string;
  accuracy: number;
  reason_unanswered: string;
  created_at: string;
  updated_at: string;
}

export interface Interview {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface InterviewWithQA extends Interview {
  qa: QuestionAnswer[];
}

export interface UpdateInterviewRequest {
  interview: Interview;
  qaList: QuestionAnswer[];
}

export type MockInterviewPurpose = "practice" | "assessment";
export type MockInterviewStatus = "pending" | "running" | "finished" | "failed";

export interface MockInterview {
  id: number;
  user_id: number;
  purpose: MockInterviewPurpose;
  specialty: string;
  target_grade: string;
  candidate_cv: string;
  vacancy_description: string;
  status: MockInterviewStatus;
  share_token: string;
  created_at: string;
  updated_at: string;
}

export interface CreateMockInterviewRequest {
  purpose: MockInterviewPurpose;
  specialty: string;
  target_grade: string;
  candidate_cv: string;
  vacancy_description: string;
}

export interface UpdateMockInterviewRequest {
  purpose?: MockInterviewPurpose;
  specialty?: string;
  target_grade?: string;
  candidate_cv?: string;
  vacancy_description?: string;
  status?: MockInterviewStatus;
}

export interface MockInterviewResult {
  id: number;
  mock_interview_id: number;
  average_accuracy: number;
  evaluation_level: string;
  verdict: string;
  verdict_reason: string;
  candidate_summary: string;
  is_manually_edited: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateMockInterviewResultRequest {
  mock_interview_id: number;
  average_accuracy: number;
  evaluation_level: string;
  verdict: string;
  verdict_reason: string;
  candidate_summary: string;
}

export interface UpdateMockInterviewResultRequest {
  average_accuracy?: number;
  evaluation_level?: string;
  verdict?: string;
  verdict_reason?: string;
  candidate_summary?: string;
}

export interface MockInterviewStatusHistoryItem {
  date: string;
  status: string;
  user_name: string;
}

export interface MockInterviewStatusHistory {
  id: number;
  mock_interview_id: number;
  data: MockInterviewStatusHistoryItem[];
  created_at: string;
  updated_at: string;
}

export interface MockInterviewQA {
  id: number;
  mock_interview_id: number;
  seq_number: number;
  question: string;
  object_name: string;
  candidate_answer: string;
  is_answered: boolean;
  score: number | null;
  feedback: string | null;
  created_at: string;
}

export interface AnswerMockInterviewQARequest {
  file: Blob;
}
