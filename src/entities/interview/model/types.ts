export interface InterviewResultQuestion {
  id: number;
  title: string;
  score: number;
}

export interface InterviewResultMetrics {
  averageAccuracy: number;
  answeredQuestions: number;
  totalQuestions: number;
  confidenceScore: string;
  sessionDuration: string;
}

export interface InterviewResultData {
  interviewId: number;
  totalScore: number;
  candidateLevel: string;
  verdict: string;
  aiSummary: string;
  metrics: InterviewResultMetrics;
  questions: InterviewResultQuestion[];
}
